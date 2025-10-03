#!/bin/bash

set -e

echo "================================================"
echo "  KaspaZof - Local Kaspa Monitor Setup"
echo "================================================"
echo ""

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check for Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    
    # Generate a secure encryption key
    if command -v openssl &> /dev/null; then
        ENCRYPTION_KEY=$(openssl rand -hex 32)
        # Replace the placeholder in .env
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/your_secure_encryption_key_here_generate_with_openssl_rand_hex_32/$ENCRYPTION_KEY/" .env
        else
            # Linux
            sed -i "s/your_secure_encryption_key_here_generate_with_openssl_rand_hex_32/$ENCRYPTION_KEY/" .env
        fi
        echo "✓ Generated secure encryption key"
    else
        echo "⚠️  OpenSSL not found. Please manually generate an encryption key:"
        echo "   openssl rand -hex 32"
        echo "   And update WALLET_ENCRYPTION_KEY in .env file"
    fi
    
    echo ""
    echo "⚠️  IMPORTANT: Please review and update .env file with your settings"
    echo "   Especially update KASPAD_RPC_PASS with a secure password"
    echo ""
    read -p "Press Enter to continue after reviewing .env file..."
else
    echo "✓ .env file already exists"
fi

echo ""
echo "Building and starting KaspaZof..."
echo ""

# Build and start services
docker-compose build
docker-compose up -d

echo ""
echo "================================================"
echo "  ✓ KaspaZof is starting up!"
echo "================================================"
echo ""
echo "Services:"
echo "  • Frontend:  http://localhost:5173"
echo "  • Backend:   http://localhost:8000"
echo "  • API Docs:  http://localhost:8000/docs"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop:"
echo "  docker-compose down"
echo ""
echo "⚠️  SECURITY REMINDERS:"
echo "  • This is for LOCAL USE ONLY"
echo "  • Never expose ports to the internet"
echo "  • Never commit .env file to version control"
echo "  • Keep your encryption keys secure"
echo ""
echo "Waiting for services to be ready..."
sleep 5

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✓ Services are running!"
    echo ""
    echo "Opening frontend in browser..."
    
    # Try to open browser
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:5173
    elif command -v open &> /dev/null; then
        open http://localhost:5173
    else
        echo "Please open http://localhost:5173 in your browser"
    fi
else
    echo "⚠️  Services may not be ready yet. Check logs with:"
    echo "   docker-compose logs -f"
fi

echo ""
echo "Setup complete! 🎉"
