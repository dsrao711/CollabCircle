import uvicorn

if __name__ == "__main__":
    uvicorn.run("api:app", reload=True, debug=True)