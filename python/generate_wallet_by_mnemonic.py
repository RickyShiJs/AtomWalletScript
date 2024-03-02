import cosmospy
seed = (
    "teach there dream chase fatigue abandon lava super senior artefact close upgrade"
)
# 第一部分：生成地址和私钥
private_keys = []
addresses = []

for i in range(100):
    path="m/44'/118'/0'/0/"+str(i);

    privkey_byte = cosmospy.seed_to_privkey(seed, path=path);
    privkey = privkey_byte.hex() 


    address = cosmospy.privkey_to_address(privkey_byte, hrp='osmo') # 修改为希望生成的链
    private_keys.append(privkey)
    addresses.append(address)   
       
    # 保存私钥和地址
    with open("wallets.txt", "a") as file:
        file.write(f"Wallet {i+1}:\n")
        file.write(f"Path: {path}\n")
        file.write(f"Private Key (hex): {privkey}\n")
        file.write(f"Address: {address}\n")
        file.write("----------------------------------------\n")

print("Addresses and private keys saved to wallets.txt. For mnemonic seed:\n" + seed)

# 第二部分：创建并打印 recipient_addresses 数组
recipient_addresses = addresses
print("Recipient Addresses:")
print(recipient_addresses)