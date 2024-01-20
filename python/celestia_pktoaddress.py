import cosmospy

# 第一部分：生成Celestia地址和私钥
private_keys = [] # 这里放和Atom一样的私钥数组
addresses = []

for i in range(100):
    print(private_keys[i])
    private_byte_obj = bytes.fromhex(private_keys[i]) # HEX字符串换回byte

    address = cosmospy.privkey_to_address(private_byte_obj, hrp='celestia')
    addresses.append(address)

    # 保存私钥和地址
    with open("tiawallet.txt", "a") as file:
        file.write(f"Wallet {i+1}:\n")
        file.write(f"Private Key (hex): {private_keys[i]}\n")
        file.write(f"Address: {address}\n")
        file.write("----------------------------------------\n")

print("Addresses and private keys saved to tiawallet.txt")

# 第二部分：创建并打印 recipient_addresses 数组
recipient_addresses = addresses
print("Recipient Addresses:")
print(recipient_addresses)
