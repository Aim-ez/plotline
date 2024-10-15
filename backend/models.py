# do this before main so that you know what
# kinds of data operations you'll be doing 
# before building main functions

from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


    # function that takes our fields above and convert into
    # python dictionary which can then be converted into 
    # JSON (JavaScript Object Notation) which is something 
    # we can pass to/from our API
    def to_json(self):
        return {
            "id": self.id, # camelCase for JSON, snake_case for python
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }