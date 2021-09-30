
while True:
    color = input('Enter "green", "yellow", "red" or ("exit" to leave): ').lower()
    print(f'The user entered {color}')

    if color == "green": 
        print("Go!")
    elif color == "yellow":
        print("Slow Down!")
    elif color == "red":
        print("Stop!")
    elif color == "exit":
        break
    else: 
        print("Bogus!")

# while True:
#     name = input("Whats your name")
#     if name == "exit":
#         break
#     print(f"Hello {name}")
