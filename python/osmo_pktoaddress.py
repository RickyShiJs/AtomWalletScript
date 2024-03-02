import cosmospy

# 第一部分：生成地址和私钥
private_keys = []
addresses = []

for i in range(100):
    print(private_keys[i])
    private_byte_obj = bytes.fromhex(private_keys[i])

    address = cosmospy.privkey_to_address(private_byte_obj, hrp='osmo')
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
