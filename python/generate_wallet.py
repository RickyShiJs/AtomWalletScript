import cosmospy

# 第一部分：生成地址和私钥
private_keys = []
addresses = []

for i in range(100):
    wallet = cosmospy.generate_wallet()
    private_key_hex = wallet["private_key"].hex()  # 私钥转换为十六进制格式
    address = wallet["address"]

    private_keys.append(private_key_hex)
    addresses.append(address)

    # 保存私钥和地址
    with open("wallets.txt", "a") as file:
        file.write(f"Wallet {i+1}:\n")
        file.write(f"Private Key (hex): {private_key_hex}\n")
        file.write(f"Address: {address}\n")
        file.write("----------------------------------------\n")

print("Addresses and private keys saved to wallets.txt")

# 第二部分：创建并打印 recipient_addresses 数组
recipient_addresses = addresses
print("Recipient Addresses:")
print(recipient_addresses)
