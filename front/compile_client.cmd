rmdir /s /q .\src\client
mkdir .\src\client
cmd /c openapi -i http://localhost:8000/openapi.json -o ./src/client --client axios
copy .\_tsconfig.json .\src\client\tsconfig.json
cd ./src/client
tsc