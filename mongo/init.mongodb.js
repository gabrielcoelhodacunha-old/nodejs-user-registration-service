use("nodejs_services");

// Users
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["external_id", "email", "password", "created_at"],
      properties: {
        external_id: uuidBsonType(),
        email: {
          bsonType: "string",
        },
        password: {
          bsonType: "string",
        },
        created_at: {
          bsonType: "date",
        },
      },
    },
  },
});
db.users.createIndex({ external_id: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

// Utility functions
function uuidBsonType() {
  return {
    bsonType: "binData",
    properties: {
      subType: {
        enum: ["04"],
      },
    },
  };
}
