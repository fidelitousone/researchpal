import uuid
from flask import render_template

from server import create_app, run_app, db, socketio
from server.models import AuthType, Users, Projects, Sources




def new_google_user(profile):
    profile_picture = profile["imageUrl"]
    email = profile["email"]
    auth_type = AuthType.GOOGLE
    user_name = profile["name"]
    user_id = uuid.uuid4()
    db.session.add(Users(user_id, user_name,auth_type,email,profile_picture));
    db.session.commit();

# Setup Flask app
STATIC_FOLDER = "../static"
TEMPLATE_FOLDER = "../templates"
app = create_app(STATIC_FOLDER, TEMPLATE_FOLDER)
with app.app_context():
    db.create_all()
    db.session.commit()

@socketio.on("new_google_user")
def on_new_username(data):
    profile = data["response"]["profileObj"]
    new_google_user(profile)

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    run_app(app)
