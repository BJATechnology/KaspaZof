#!/bin/bash

set -e

echo "================================================"
echo "  KaspaZof - Smoke Tests"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Testing: $test_name... "
    
    if eval "$test_command" &> /dev/null; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 10

# Test 1: Check if backend container is running
run_test "Backend container running" "docker ps | grep -q kaspazof-backend"

# Test 2: Check if frontend container is running
run_test "Frontend container running" "docker ps | grep -q kaspazof-frontend"

# Test 3: Check if kaspad container is running
run_test "Kaspad container running" "docker ps | grep -q kaspazof-kaspad"

# Test 4: Backend health endpoint
run_test "Backend health endpoint" "curl -f http://localhost:8000/health"

# Test 5: Backend root endpoint
run_test "Backend root endpoint" "curl -f http://localhost:8000/"

# Test 6: Frontend is accessible
run_test "Frontend accessible" "curl -f http://localhost:5173/"

# Test 7: Backend API docs
run_test "Backend API docs" "curl -f http://localhost:8000/docs"

# Test 8: Price endpoint (may fail if CoinGecko is unavailable)
if run_test "Price endpoint accessible" "curl -f http://localhost:8000/api/prices"; then
    echo "  ℹ️  Price data fetched successfully"
else
    echo -e "  ${YELLOW}⚠️  Price endpoint failed - CoinGecko may be rate limiting${NC}"
fi

# Test 9: Wallet status endpoint
run_test "Wallet status endpoint" "curl -f http://localhost:8000/api/wallet/status"

# Test 10: Check Docker volumes
run_test "Wallet data volume exists" "docker volume ls | grep -q kaspazof_wallet-data"
run_test "Kaspad data volume exists" "docker volume ls | grep -q kaspazof_kaspad-data"

echo ""
echo "================================================"
echo "  Test Results"
echo "================================================"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All critical tests passed!${NC}"
    echo ""
    echo "KaspaZof is running correctly!"
    echo "  • Frontend: http://localhost:5173"
    echo "  • Backend:  http://localhost:8000"
    echo "  • API Docs: http://localhost:8000/docs"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Check logs:${NC}"
    echo "  docker-compose logs"
    exit 1
fi
