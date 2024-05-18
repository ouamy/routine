from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.mawaqitController import router as mawaqitRouter

def create_app() -> FastAPI:
    app = FastAPI(title='Mawaqit Api', debug=False, root_path="/")
    # Allow cross-origin requests from all domains
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow requests from all origins (you can restrict this to specific origins if needed)
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow the specified HTTP methods
        allow_headers=["*"],  # Allow all headers
    )
    return app

app = create_app()
app.include_router(router=mawaqitRouter)
