# Fedora VirtualBox DNS Server and Client Setup

## Prerequisites
- VirtualBox installed
- Fedora Server ISO downloaded
- Sufficient system resources

## Step 1: Create DNS Server VM
1. Open VirtualBox and click "New"
2. Name: `FedoraDNSServer`
3. Type: Linux
4. Version: Fedora (64-bit)
5. Allocate RAM (recommended: 2048 MB)
6. Create a virtual hard disk (recommended: 20 GB)

## Step 2: Network Configuration for DNS Server
1. Open VM Settings > Network
2. Adapter 1: Bridged Networking or NAT
3. Adapter 2: Host-only Adapter (for internal network)

## Step 3: Install Fedora on DNS Server
1. Boot from Fedora ISO
2. Install Fedora Server Edition
3. During installation, configure network:
   - IP Address: 192.168.1.10
   - Netmask: 255.255.255.0
   - Gateway: (your network gateway)
   - DNS: (temporary, will be configured later)

## Step 4: Install BIND DNS Server
```bash
sudo dnf install bind bind-utils
```

## Step 5: Configure BIND (/etc/named.conf)
```bash
sudo nano /etc/named.conf
```
Add/modify configuration:
```
options {
    listen-on port 53 { 192.168.1.10; };
    directory   "/var/named";
    dump-file   "/var/named/data/cache_dump.db";
    statistics-file "/var/named/data/named_stats.txt";
    memstatistics-file "/var/named/data/named_mem_stats.txt";
    allow-query     { localhost; 192.168.1.0/24; };
    recursion yes;
};

zone "intra.ests.com" IN {
    type master;
    file "/var/named/zones/intra.ests.com.zone";
    allow-update { none; };
};
```

## Step 6: Create Forward and Reverse Zone Files
### Create Forward Zone
```bash
sudo mkdir -p /var/named/zones
sudo nano /var/named/zones/intra.ests.com.zone
```
Add forward zone records:
```
$TTL 86400
@   IN  SOA     ns1.intra.ests.com. admin.intra.ests.com. (
        2024031201  ; Serial (update date)
        3600        ; Refresh
        1800        ; Retry
        604800      ; Expire
        86400 )     ; Minimum TTL

@       IN  NS      ns1.intra.ests.com.
@       IN  A       192.168.1.10
ns1     IN  A       192.168.1.10
client  IN  A       192.168.1.100
```

### Create Reverse Zone
```bash
sudo nano /var/named/zones/1.168.192.in-addr.arpa.zone
```
Add reverse zone records:
```
$TTL 86400
@   IN  SOA     ns1.intra.ests.com. admin.intra.ests.com. (
        2024031201  ; Serial (update date)
        3600        ; Refresh
        1800        ; Retry
        604800      ; Expire
        86400 )     ; Minimum TTL

@       IN  NS      ns1.intra.ests.com.
10      IN  PTR     ns1.intra.ests.com.
100     IN  PTR     client.intra.ests.com.
```

### Update named.conf to Include Reverse Zone
```bash
sudo nano /etc/named.conf
```
Add to the existing configuration:
```
zone "1.168.192.in-addr.arpa" IN {
    type master;
    file "/var/named/zones/1.168.192.in-addr.arpa.zone";
    allow-update { none; };
};
```

## Step 7: Configure Firewall
```bash
sudo firewall-cmd --permanent --add-service=dns
sudo firewall-cmd --reload
```

## Step 8: Start and Enable BIND
```bash
sudo systemctl enable named
sudo systemctl start named
```

## Step 9: Create Client VM
1. Repeat VM creation process
2. Name: `FedoraClient`
3. Use similar network settings
4. Install Fedora Desktop/Server

## Step 10: Configure Client Network
1. Set static IP:
```bash
sudo nmcli connection modify "Wired connection 1" \
    ipv4.addresses 192.168.1.100/24 \
    ipv4.gateway YOUR_GATEWAY \
    ipv4.dns 192.168.1.10 \
    ipv4.method manual
sudo nmcli connection up "Wired connection 1"
```

## Step 11: Test DNS Configuration
On Client:
```bash
# Verify DNS resolution
nslookup ns1.intra.ests.com
ping ns1.intra.ests.com
```

## Troubleshooting
- Check BIND logs: `sudo journalctl -u named`
- Verify configuration: `sudo named-checkconf`
- Verify zone file: `sudo named-checkzone intra.ests.com /var/named/zones/intra.ests.com.zone`

## Notes
- Replace placeholders like YOUR_GATEWAY with actual network gateway
- Adjust firewall and SELinux settings if needed
- Ensure consistent network configuration
