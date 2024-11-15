import base64

encrypted_data = "84YznwCKbFPxe007bH8mSsSHo/59+n3WW3UeVTV5e/FM7rXybDej7t9N/Dy6u45eVXip0D4n2Jur4F4KgQitZL9O/m9xjuv47S+91hZCZibUs4uGy/t4l/PdRwEAt34A6Lr7evFdx9nxXHB2LNSfbQ=="
decoded_data = base64.b64decode(encrypted_data)
print(decoded_data)
