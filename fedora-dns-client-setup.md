# Fedora VirtualBox DNS and Client Setup Guide

This guide will help you set up two Fedora VirtualBox instances: one as a DNS server and another as a client.

## VirtualBox Setup

First, let's create two virtual machines in VirtualBox:

1. Install VirtualBox if you haven't already
2. Create two virtual machines with these specifications:
   - 2 GB RAM (minimum)
   - 20 GB disk space
   - Network adapter set to "Internal Network" for both VMs (name it "intranet")

## DNS Server Configuration (192.168.1.10)

### 1. Install Fedora on the first VM

After booting from the Fedora ISO:
- Complete the standard installation
- Set hostname to `dns.intra.ests.com`

### 2. Configure Static IP

Once installation is complete and you've logged in:

```bash
sudo nano /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

Add/modify these lines:
```
TYPE=Ethernet
BOOTPROTO=static
IPADDR=192.168.1.10
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=127.0.0.1
ONBOOT=yes
```

Restart networking:
```bash
sudo systemctl restart NetworkManager
```

### 3. Install and Configure BIND DNS Server

```bash
# Install BIND
sudo dnf install bind bind-utils -y

# Backup the original configuration
sudo cp /etc/named.conf /etc/named.conf.orig
```

Edit the main configuration:
```bash
sudo nano /etc/named.conf
```

Replace content with:
```
options {
    listen-on port 53 { 127.0.0.1; 192.168.1.10; };
    listen-on-v6 port 53 { ::1; };
    directory "/var/named";
    dump-file "/var/named/data/cache_dump.db";
    statistics-file "/var/named/data/named_stats.txt";
    memstatistics-file "/var/named/data/named_mem_stats.txt";
    secroots-file "/var/named/data/named.secroots";
    recursing-file "/var/named/data/named.recursing";
    allow-query { localhost; 192.168.1.0/24; };
    recursion yes;
    forwarders { 1.1.1.1; 8.8.8.8; };
    forward first;
    dnssec-validation yes;
    managed-keys-directory "/var/named/dynamic";
    pid-file "/run/named/named.pid";
    session-keyfile "/run/named/session.key";
};

logging {
    channel default_debug {
        file "data/named.run";
        severity dynamic;
    };
};

zone "." IN {
    type hint;
    file "named.ca";
};

zone "intra.ests.com" IN {
    type master;
    file "intra.ests.com.zone";
    allow-update { none; };
};

zone "1.168.192.in-addr.arpa" IN {
    type master;
    file "1.168.192.zone";
    allow-update { none; };
};

include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

### 4. Create Zone Files

Create the forward zone file:
```bash
sudo nano /var/named/intra.ests.com.zone
```

Add:
```
$TTL 86400
@   IN  SOA     dns.intra.ests.com. admin.intra.ests.com. (
        2023011301  ; Serial
        3600        ; Refresh
        1800        ; Retry
        604800      ; Expire
        86400 )     ; Minimum TTL
; Name servers
@       IN  NS      dns.intra.ests.com.
; A records
dns     IN  A       192.168.1.10
client  IN  A       192.168.1.100
```

Create the reverse zone file:
```bash
sudo nano /var/named/1.168.192.zone
```

Add:
```
$TTL 86400
@   IN  SOA     dns.intra.ests.com. admin.intra.ests.com. (
        2023011301  ; Serial
        3600        ; Refresh
        1800        ; Retry
        604800      ; Expire
        86400 )     ; Minimum TTL
; Name servers
@       IN  NS      dns.intra.ests.com.
; PTR Records
10      IN  PTR     dns.intra.ests.com.
100     IN  PTR     client.intra.ests.com.
```

Set proper permissions:
```bash
sudo chown named:named /var/named/intra.ests.com.zone
sudo chown named:named /var/named/1.168.192.zone
```

### 5. Enable and Start BIND

```bash
sudo systemctl enable named
sudo systemctl start named
sudo firewall-cmd --permanent --add-service=dns
sudo firewall-cmd --reload
```

## Client Configuration (192.168.1.100)

### 1. Install Fedora on the second VM

After booting from the Fedora ISO:
- Complete the standard installation
- Set hostname to `client.intra.ests.com`

### 2. Configure Static IP with DNS Server

Once installation is complete and you've logged in:

```bash
sudo nano /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

Add/modify these lines:
```
TYPE=Ethernet
BOOTPROTO=static
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=192.168.1.10
ONBOOT=yes
```

Restart networking:
```bash
sudo systemctl restart NetworkManager
```

### 3. Test DNS Resolution

On the client, verify that DNS resolution is working:

```bash
# Test forward lookup
nslookup dns.intra.ests.com

# Test reverse lookup
nslookup 192.168.1.10

# Try ping
ping dns.intra.ests.com
```

You should see successful resolutions for these queries, confirming that your DNS setup is working correctly.

## Troubleshooting Tips

If DNS resolution isn't working:

1. Check if BIND is running on the DNS server:
   ```bash
   sudo systemctl status named
   ```

2. Check for errors in the BIND logs:
   ```bash
   sudo journalctl -u named
   ```

3. Verify firewall settings:
   ```bash
   sudo firewall-cmd --list-all
   ```

4. Test connectivity between VMs:
   ```bash
   ping 192.168.1.10  # From client
   ping 192.168.1.100  # From DNS server
   ```
