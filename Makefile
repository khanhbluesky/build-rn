
run: run-android run-ios

run-android:
	cd frontend && npm run android

run-ios:
	cd frontend && npm run ios -- --simulator='iPhone 14 Pro Max'

server:
	cd backend && npm start

redis:
	start "" "ubuntu2204.exe" && redis-server