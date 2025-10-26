#!/usr/bin/env python3
"""
ARSO WEATHER & WATER QUALITY INTEGRATION
Real-time + mock data for Sava River monitoring
"""
pip install requests
import json
from datetime import datetime
from typing import Dict, List, Optional

class ARSOIntegration:
    def __init__(self):
        self.weather_url = "http://meteo.arso.gov.si/uploads/probase/www/observ/surface/text/sl/observationAms_si_latest.xml"
        self.gis_url = "https://gis.arso.gov.si/arcgis/rest/services/KakovostPovrsinskihVoda/MapServer/0/query"
        
        # Sava River stations (real IDs from ARSO)
        self.stations = {
            "podnart": {"id": "SI_01_003", "name": "Podnart", "lat": 46.4319, "lon": 14.0536},
            "otoce": {"id": "SI_02_007", "name": "Otoče", "lat": 46.1547, "lon": 15.0497},
            "okroglo": {"id": "SI_01_008", "name": "Okroglo", "lat": 45.9381, "lon": 15.5151}
        }
        
        # Industrial sites with EHI scores
        self.industrial_sites = [
            {"id": 1, "name": "SIJ Acroni", "lat": 46.0569, "lon": 14.5058, "ehi": 0.62, 
             "emissions": "196,000 t CO₂", "reality": "11.7% reduction (2024)"},
            {"id": 2, "name": "Lafarge/Holcim", "lat": 46.1547, "lon": 15.0497, "ehi": 0.89,
             "emissions": "450,000 t CO₂ (hist.)", "reality": "Closed 2015"},
            {"id": 3, "name": "Ljubljana Čistilna", "lat": 46.0569, "lon": 14.5058, "ehi": 0.69,
             "emissions": "1.64 mg/L nitrates", "reality": "High NO3 concentrations"},
            {"id": 4, "name": "Cinkarna Celje", "lat": 46.2361, "lon": 15.2676, "ehi": 0.60,
             "emissions": "15 t Pb, 18 t Zn", "reality": "-15% heavy metals (2024)"},
            {"id": 5, "name": "Krško NE", "lat": 45.9381, "lon": 15.5151, "ehi": 0.42,
             "emissions": "+2-3°C", "reality": "Minimal radioactive discharge"}
        ]
    
    def get_mock_water_quality(self, station: str = "podnart") -> Dict:
        """
        Mock Sava water quality data (2023-2024 averages)
        Source: ARSO 2023/2024 reports, E-PRTR 2023
        """
        mock_data = {
            "podnart": {
                "NO3": 38.8,  # mg/L (Savinjska groundwater, 2024)
                "Pb": 0.015,  # mg/L (below EQS)
                "Hg_biota": 150,  # μg/kg (fish tissue, Podkraj 2023, above EQS)
                "Temp": 14.2,  # °C (baseline)
                "N_discharge": 1074,  # t/year (surface water, 2023)
                "status": "Moderate (chemical status: fail due to Hg)"
            },
            "otoce": {
                "NO3": 35.2,
                "Pb": 0.012,
                "Hg_biota": 130,
                "Temp": 15.8,
                "N_discharge": 850,
                "status": "Moderate"
            },
            "okroglo": {
                "NO3": 42.1,
                "Pb": 0.018,
                "Hg_biota": 180,  # Higher due to NEK thermal discharge
                "Temp": 17.0,  # +2.74°C from NEK (2024 avg)
                "N_discharge": 920,
                "status": "Poor (thermal + chemical stress)"
            }
        }
        
        station_data = mock_data.get(station, mock_data["podnart"])
        station_info = self.stations.get(station, self.stations["podnart"])
        
        return {
            "station": station_info["name"],
            "station_id": station_info["id"],
            "coordinates": {"lat": station_info["lat"], "lon": station_info["lon"]},
            "timestamp": datetime.now().isoformat(),
            "data": station_data,
            "source": "ARSO_MOCK",
            "note": "Real ARSO data requires ZDIJZ request (info@arso.gov.si)"
        }
    
    def get_weather_data(self) -> Dict:
        """
        Attempt to fetch real ARSO weather data, fallback to mock
        """
        try:
            response = requests.get(self.weather_url, timeout=10)
            if response.status_code == 200:
                # Simplified XML parsing (production: use xml.etree)
                temp = humidity = pressure = wind = "N/A"
                
                if "t=" in response.text:
                    temp_start = response.text.find("t=") + 3
                    temp_end = response.text.find("'", temp_start)
                    temp = response.text[temp_start:temp_end]
                
                return {
                    "location": "Ljubljana Bežigrad",
                    "timestamp": datetime.now().isoformat(),
                    "data": {
                        "temperature": temp,
                        "humidity": humidity,
                        "pressure": pressure,
                        "wind_speed": wind
                    },
                    "source": "ARSO_LIVE"
                }
            else:
                return self._get_mock_weather()
        except Exception as e:
            print(f"ARSO API error: {e}")
            return self._get_mock_weather()
    
    def _get_mock_weather(self) -> Dict:
        """Fallback weather data"""
        return {
            "location": "Ljubljana Bežigrad",
            "timestamp": datetime.now().isoformat(),
            "data": {
                "temperature": "15.2",
                "humidity": "78",
                "pressure": "1013",
                "wind_speed": "3.2"
            },
            "source": "ARSO_MOCK"
        }
    
    def generate_environmental_alerts(self, water_data: Dict) -> List[str]:
        """Generate alerts based on water quality thresholds"""
        alerts = []
        data = water_data["data"]
        
        # Nitrate alert (EQS: 50 mg/L for drinking water)
        if data["NO3"] > 40:
            alerts.append(f"⚠️ HIGH NITRATES: {data['NO3']} mg/L (approaching EQS limit)")
        
        # Heavy metals alert
        if data["Hg_biota"] > 100:
            alerts.append(f"🩸 MERCURY EXCEEDANCE: {data['Hg_biota']} μg/kg (above EQS)")
        
        # Temperature alert (NEK discharge)
        if data["Temp"] > 16:
            alerts.append(f"🔥 THERMAL STRESS: {data['Temp']}°C (likely NEK discharge)")
        
        # Nitrogen discharge alert
        if data["N_discharge"] > 1000:
            alerts.append(f"☠️ HIGH N DISCHARGE: {data['N_discharge']} t/year (eutrophication risk)")
        
        return alerts
    
    def get_all_stations_data(self) -> Dict:
        """Fetch data for all Sava stations"""
        all_data = {}
        for station in self.stations.keys():
            water_data = self.get_mock_water_quality(station)
            alerts = self.generate_environmental_alerts(water_data)
            
            all_data[station] = {
                **water_data,
                "alerts": alerts
            }
        
        return all_data
    
    def get_industrial_sites(self) -> List[Dict]:
        """Return industrial sites with EHI scores"""
        return self.industrial_sites

# CLI Testing
if __name__ == "__main__":
    arso = ARSOIntegration()
    
    print("🧪 TESTING ARSO INTEGRATION")
    print("=" * 70)
    
    # Test weather
    print("\n🌤️  WEATHER DATA:")
    weather = arso.get_weather_data()
    print(f"   Location: {weather['location']}")
    print(f"   Source: {weather['source']}")
    print(f"   Temperature: {weather['data']['temperature']}°C")
    
    # Test water quality for all stations
    print("\n🌊 SAVA RIVER WATER QUALITY:")
    all_stations = arso.get_all_stations_data()
    
    for station_key, station_data in all_stations.items():
        print(f"\n📍 {station_data['station']} ({station_data['station_id']})")
        print(f"   Coordinates: {station_data['coordinates']}")
        print(f"   NO3: {station_data['data']['NO3']} mg/L")
        print(f"   Hg (biota): {station_data['data']['Hg_biota']} μg/kg")
        print(f"   Temperature: {station_data['data']['Temp']}°C")
        print(f"   Status: {station_data['data']['status']}")
        
        if station_data['alerts']:
            print(f"   ⚠️  ALERTS:")
            for alert in station_data['alerts']:
                print(f"      {alert}")
    
    # Test industrial sites
    print("\n🏭 INDUSTRIAL SITES (EHI):")
    sites = arso.get_industrial_sites()
    for site in sites:
        print(f"   {site['name']}: EHI = {site['ehi']}")
    
    print("\n" + "=" * 70)
    print("✅ ARSO INTEGRATION TEST COMPLETE")
    print("💡 To access real data, submit ZDIJZ request (see wolf-daemon/zdijz_template.txt)")
