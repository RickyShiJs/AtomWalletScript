keys = []
with open('wallets.txt', 'r') as file:
    for line in file:
        if 'Private Key (hex):' in line:
            key = line.split('Private Key (hex):')[1].strip()
            keys.append(key)

print(keys)