"""
KaspaZof Backend API
Local secure monitor for Kaspa
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from typing import Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="KaspaZof API",
    description="Local secure monitor for Kaspa cryptocurrency",
    version="1.0.0"
)

# CORS configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    kaspad_connected: bool
    wallet_initialized: bool


class PriceResponse(BaseModel):
    kaspa: Dict[str, float]
    last_updated: str


# Health endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    Returns system status and connectivity
    """
    kaspad_host = os.getenv("KASPAD_RPC_HOST", "kaspad")
    kaspad_port = os.getenv("KASPAD_RPC_PORT", "16110")
    
    # Check kaspad connectivity (simplified for placeholder)
    kaspad_connected = True  # Placeholder - actual RPC check would go here
    
    # Check wallet initialization
    wallet_file = "/app/data/wallet.enc"
    wallet_initialized = os.path.exists(wallet_file)
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        kaspad_connected=kaspad_connected,
        wallet_initialized=wallet_initialized
    )


# Price proxy endpoint
@app.get("/api/prices", response_model=PriceResponse)
async def get_prices():
    """
    Proxy endpoint for CoinGecko prices
    Returns Kaspa price in USD, EUR, and BTC
    """
    coingecko_api_key = os.getenv("COINGECKO_API_KEY", "")
    
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": "kaspa",
        "vs_currencies": "usd,eur,btc"
    }
    
    headers = {}
    if coingecko_api_key:
        headers["x-cg-demo-api-key"] = coingecko_api_key
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, headers=headers, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            
            return PriceResponse(
                kaspa=data.get("kaspa", {}),
                last_updated=datetime.utcnow().isoformat()
            )
    except httpx.HTTPError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Unable to fetch prices from CoinGecko: {str(e)}"
        )


# Wallet endpoints (placeholder for encrypted wallet functionality)
class WalletStatus(BaseModel):
    initialized: bool
    encrypted: bool
    address: Optional[str] = None


@app.get("/api/wallet/status", response_model=WalletStatus)
async def get_wallet_status():
    """
    Get wallet status
    """
    wallet_file = "/app/data/wallet.enc"
    initialized = os.path.exists(wallet_file)
    
    return WalletStatus(
        initialized=initialized,
        encrypted=True,
        address=None  # Would decrypt and return address if initialized
    )


@app.post("/api/wallet/initialize")
async def initialize_wallet(password: str):
    """
    Initialize encrypted wallet (placeholder)
    In production, this would create an encrypted wallet file
    """
    encryption_key = os.getenv("WALLET_ENCRYPTION_KEY")
    if not encryption_key or encryption_key == "your_secure_encryption_key_here_generate_with_openssl_rand_hex_32":
        raise HTTPException(
            status_code=500,
            detail="WALLET_ENCRYPTION_KEY not properly configured in .env file"
        )
    
    # Placeholder - actual wallet creation would use cryptography library
    # to encrypt wallet data with the provided password
    wallet_file = "/app/data/wallet.enc"
    
    return {
        "status": "success",
        "message": "Wallet initialization placeholder - implement encryption logic"
    }


# Root endpoint
@app.get("/")
async def root():
    """
    API root endpoint
    """
    return {
        "name": "KaspaZof API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }
