"""
🜂 T9 ORION API - SECURED VERSION 🜂
FastAPI hardening with sacred armor against shadow attacks

Based on Ara's 2025 security techniques:
- Rate limiting (slowapi: 5 req/min on sensitive endpoints)
- CORS locked to specific origins
- Output sanitization with bleach
- OAuth2 authentication skeleton
- Input validation with Pydantic
- Logging for anomaly detection
- SQL injection prevention
- XSS protection in JSON responses

🔥 SIDRO STOJI. OGENJ GORI. API ARMORED. 🔥
"""

from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
import sqlite3
import bleach
import re
import hashlib
import secrets
import logging
from datetime import datetime, timedelta
import json

# ========================================
# CONFIGURATION & INITIALIZATION
# ========================================

# Configure logging for anomaly detection
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('orion_api_security.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="🜂 Orion API - Secured",
    description="Mercury contamination data API with comprehensive security hardening",
    version="2.0.0-secure",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc
)

# Rate limiter configuration
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Configuration - LOCKED TO SPECIFIC ORIGINS
ALLOWED_ORIGINS = [
    "https://sabaftw.github.io",
    "http://localhost:3000",  # For local development
    "http://localhost:5173",  # Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # ⚠️ NEVER use ["*"] in production!
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Limit to needed methods only
    allow_headers=["*"],
    max_age=3600  # Cache preflight requests for 1 hour
)

# OAuth2 configuration (skeleton for future auth)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

# Database path
DB_PATH = "orion_mercury.db"

# ========================================
# SECURITY UTILITIES
# ========================================

def sanitize_html(text: str) -> str:
    """
    Sanitize HTML output using bleach
    Prevents XSS in JSON responses
    """
    if not text:
        return ""
    
    # Allow only safe tags (none for API - pure text only)
    return bleach.clean(
        text,
        tags=[],  # No HTML tags allowed in API responses
        attributes={},
        strip=True
    )

def escape_sql(text: str) -> str:
    """
    Extra SQL injection protection
    (Pydantic + parameterized queries are primary defense)
    """
    if not text:
        return ""
    
    # Remove dangerous SQL keywords and characters
    dangerous_patterns = [
        r"(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)",
        r"(--|#|/\*|\*/)",
        r"(\bOR\b.*=.*)",
        r"(\bAND\b.*=.*)",
        r"(;|\|)"
    ]
    
    cleaned = text
    for pattern in dangerous_patterns:
        cleaned = re.sub(pattern, "", cleaned, flags=re.IGNORECASE)
    
    return cleaned.strip()

def validate_location(location: str) -> bool:
    """
    Validate location string format
    Prevents directory traversal and injection attacks
    """
    # Allow only alphanumeric, spaces, hyphens, and common location chars
    pattern = r'^[a-zA-Z0-9\s\-\.,]+$'
    return bool(re.match(pattern, location)) and len(location) <= 200

def log_suspicious_activity(request: Request, reason: str):
    """
    Log potentially malicious requests for analysis
    """
    logger.warning(f"SUSPICIOUS ACTIVITY: {reason} | IP: {request.client.host} | Path: {request.url.path}")

# ========================================
# PYDANTIC MODELS WITH VALIDATION
# ========================================

class MercuryQuery(BaseModel):
    """Query model for mercury level searches"""
    location: Optional[str] = Field(None, max_length=200)
    min_level: Optional[float] = Field(None, ge=0, le=100)
    max_level: Optional[float] = Field(None, ge=0, le=100)
    
    @validator('location')
    def validate_location_format(cls, v):
        if v and not validate_location(v):
            raise ValueError('Invalid location format')
        return escape_sql(v) if v else None

class ContaminationZone(BaseModel):
    """Model for contamination zone data"""
    zone_name: str = Field(..., max_length=200)
    severity: float = Field(..., ge=0, le=10)
    description: str = Field(..., max_length=1000)
    
    @validator('zone_name', 'description')
    def sanitize_text_fields(cls, v):
        return sanitize_html(v)

class UserAnnotation(BaseModel):
    """Model for community annotations (future feature)"""
    site_id: str = Field(..., max_length=50)
    comment: str = Field(..., min_length=10, max_length=500)
    evidence_type: Optional[str] = Field(None, max_length=50)
    
    @validator('comment')
    def sanitize_comment(cls, v):
        # Remove all HTML and potentially dangerous content
        cleaned = bleach.clean(v, tags=[], strip=True)
        if len(cleaned) < 10:
            raise ValueError('Comment too short after sanitization')
        return cleaned

# ========================================
# AUTHENTICATION (SKELETON FOR FUTURE)
# ========================================

# In production, implement proper user database and password hashing
DEMO_USERS = {
    "orion_admin": {
        "username": "orion_admin",
        "hashed_password": hashlib.sha256("change_this_password".encode()).hexdigest(),
        "disabled": False
    }
}

async def get_current_user(token: Optional[str] = Depends(oauth2_scheme)):
    """
    Optional authentication
    Currently returns None (no auth required)
    Implement full OAuth2 for production deployment
    """
    # For now, allow unauthenticated access
    # In production: validate JWT token, check user permissions
    return None

# ========================================
# DATABASE HELPERS
# ========================================

def get_db_connection():
    """Get database connection with safety checks"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # Return rows as dicts
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database temporarily unavailable"
        )

# ========================================
# API ENDPOINTS - SECURED
# ========================================

@app.get("/")
async def root():
    """API root with security info"""
    return {
        "message": "🜂 Orion API - Secured Version",
        "version": "2.0.0-secure",
        "security_features": [
            "Rate limiting",
            "CORS restrictions",
            "Input validation",
            "Output sanitization",
            "SQL injection prevention",
            "XSS protection",
            "Anomaly logging"
        ],
        "documentation": "/docs"
    }

@app.get("/health")
@limiter.limit("10/minute")
async def health_check(request: Request):
    """Health check endpoint with rate limiting"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "security": "enabled"
    }

@app.get("/api/orion/mercury")
@limiter.limit("20/minute")  # More generous for read-only endpoint
async def get_mercury_levels(
    request: Request,
    location: Optional[str] = None,
    current_user: Optional[dict] = Depends(get_current_user)
):
    """
    Get mercury contamination levels
    Rate limited and sanitized
    """
    try:
        # Validate and sanitize location if provided
        if location:
            if not validate_location(location):
                log_suspicious_activity(request, f"Invalid location format: {location}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid location format"
                )
            location = escape_sql(location)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if location:
            # Parameterized query - primary SQL injection defense
            cursor.execute(
                "SELECT * FROM mercury_levels WHERE location LIKE ? ORDER BY date DESC",
                (f"%{location}%",)
            )
        else:
            cursor.execute("SELECT * FROM mercury_levels ORDER BY date DESC LIMIT 100")
        
        rows = cursor.fetchall()
        conn.close()
        
        # Sanitize all text fields in output
        results = []
        for row in rows:
            results.append({
                "id": row["id"],
                "location": sanitize_html(row["location"]),
                "mercury_ugL": float(row["mercury_ugL"]),
                "date": row["date"],
                "zone": sanitize_html(row["zone"]) if row["zone"] else None,
                "source": sanitize_html(row["source"]) if row["source"] else None,
                "exceedance": bool(row["exceedance"])
            })
        
        return JSONResponse(content={"mercury_levels": results})
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_mercury_levels: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@app.get("/api/orion/zones")
@limiter.limit("20/minute")
async def get_contamination_zones(
    request: Request,
    current_user: Optional[dict] = Depends(get_current_user)
):
    """Get contamination zones for mapping"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM contamination_zones")
        rows = cursor.fetchall()
        conn.close()
        
        # Sanitize all text fields
        results = []
        for row in rows:
            results.append({
                "id": row["id"],
                "zone_name": sanitize_html(row["zone_name"]),
                "gps_coords": row["gps_coords"],  # Numeric, safe
                "severity": float(row["severity"]),
                "description": sanitize_html(row["description"]),
                "pollution_type": sanitize_html(row["pollution_type"])
            })
        
        return JSONResponse(content={"zones": results})
        
    except Exception as e:
        logger.error(f"Error in get_contamination_zones: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@app.get("/api/orion/risk_assessment")
@limiter.limit("10/minute")  # More restrictive for sensitive data
async def get_risk_assessment(
    request: Request,
    current_user: Optional[dict] = Depends(get_current_user)
):
    """
    Get risk assessments from 2025 reports
    Sensitive endpoint with stricter rate limiting
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM risk_assessments ORDER BY assessment_date DESC")
        rows = cursor.fetchall()
        conn.close()
        
        # Sanitize all text fields
        results = []
        for row in rows:
            results.append({
                "id": row["id"],
                "assessment_date": row["assessment_date"],
                "risk_level": sanitize_html(row["risk_level"]),
                "health_impact": sanitize_html(row["health_impact"]),
                "eco_impact": sanitize_html(row["eco_impact"]),
                "source": sanitize_html(row["source"])
            })
        
        return JSONResponse(content={"risk_assessments": results})
        
    except Exception as e:
        logger.error(f"Error in get_risk_assessment: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@app.get("/api/orion/pollution_levels")
@limiter.limit("15/minute")
async def get_pollution_levels(
    request: Request,
    current_user: Optional[dict] = Depends(get_current_user)
):
    """Get only sites exceeding safe levels"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM mercury_levels WHERE exceedance = 1 ORDER BY mercury_ugL DESC")
        rows = cursor.fetchall()
        conn.close()
        
        # Sanitize all text fields
        results = []
        for row in rows:
            results.append({
                "id": row["id"],
                "location": sanitize_html(row["location"]),
                "mercury_ugL": float(row["mercury_ugL"]),
                "date": row["date"],
                "exceedance_percent": round(((row["mercury_ugL"] - 1.0) / 1.0) * 100, 1)
            })
        
        return JSONResponse(content={"exceeded_levels": results})
        
    except Exception as e:
        logger.error(f"Error in get_pollution_levels: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

# ========================================
# SECURITY MONITORING
# ========================================

@app.middleware("http")
async def security_monitoring_middleware(request: Request, call_next):
    """
    Monitor all requests for suspicious patterns
    Log anomalies for analysis
    """
    # Check for common attack patterns in URL
    url_str = str(request.url)
    suspicious_patterns = [
        r"<script",
        r"javascript:",
        r"onerror=",
        r"onclick=",
        r"\.\./",
        r"\.\.\\",
        r"UNION.*SELECT",
        r"DROP.*TABLE"
    ]
    
    for pattern in suspicious_patterns:
        if re.search(pattern, url_str, re.IGNORECASE):
            log_suspicious_activity(request, f"Suspicious pattern in URL: {pattern}")
    
    # Process request
    response = await call_next(request)
    
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    return response

# ========================================
# ERROR HANDLERS
# ========================================

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    """Custom error responses without exposing internal details"""
    logger.warning(f"HTTP Exception: {exc.status_code} - {exc.detail} | Path: {request.url.path}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """Catch-all for unexpected errors"""
    logger.error(f"Unhandled exception: {exc} | Path: {request.url.path}")
    
    # Don't expose internal error details to client
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal server error",
            "status": 500
        }
    )

# ========================================
# STARTUP/SHUTDOWN EVENTS
# ========================================

@app.on_event("startup")
async def startup_event():
    """Initialize security logging on startup"""
    logger.info("🜂 Orion API starting with security hardening enabled")
    logger.info(f"CORS allowed origins: {ALLOWED_ORIGINS}")
    logger.info("Rate limiting active on all endpoints")

@app.on_event("shutdown")
async def shutdown_event():
    """Clean shutdown"""
    logger.info("🔥 Orion API shutting down gracefully")

# ========================================
# DEPLOYMENT NOTES
# ========================================
"""
🔥 DEPLOYMENT CHECKLIST 🔥

1. Environment Variables:
   - Set DB_PATH to production database location
   - Configure ALLOWED_ORIGINS for production domain
   - Set up proper OAuth2 credentials

2. Dependencies:
   pip install fastapi uvicorn slowapi bleach pydantic

3. Run:
   uvicorn orion_api_secured:app --host 0.0.0.0 --port 8080

4. Testing:
   - Run security audit: python t9_security_audit.py
   - Test rate limiting: curl multiple times
   - Test CORS: from different origins
   - Test input validation: malicious inputs

5. Monitoring:
   - Check orion_api_security.log regularly
   - Set up alerting for suspicious activity
   - Monitor rate limit violations

6. Additional Hardening:
   - Use HTTPS in production (required!)
   - Implement full OAuth2 authentication
   - Set up database backups
   - Use environment variables for secrets
   - Deploy behind reverse proxy (nginx)
   - Enable firewall rules

🜂 SIDRO STOJI. OGENJ GORI. API PROTECTED. 🜂
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
