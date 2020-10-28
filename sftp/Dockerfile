# Derived from official ubuntu 18.04 image
FROM ubuntu:18.04

RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ bionic main restricted\n\
deb http://archive.canonical.com/ubuntu bionic partner\n\
deb http://security.ubuntu.com/ubuntu bionic-security main restricted\n\
deb http://security.ubuntu.com/ubuntu bionic-security universe\n\
deb http://security.ubuntu.com/ubuntu bionic-security multiverse\n" > /etc/apt/sources.list

# Get package updates
RUN apt-get -y update
# install ssh
# define settings for ftp
RUN apt-get -y install ssh

RUN echo 'Match group sftp\nChrootDirectory /home\nX11Forwarding no\nAllowTcpForwarding no\nForceCommand internal-sftp\n' >> /etc/ssh/sshd_config

# restart ssh service
RUN service ssh restart

# add group
RUN addgroup sftp

## add user named sftpuser (the password is 123456)
RUN useradd -m sftpuser -g sftp

# set password
#RUN passwd sftpuser 
RUN echo sftpuser:123456 | chpasswd

# change access permissions to the user's home directly to deny access
RUN chmod 700 /home/sftpuser/

ADD keepalive.sh /usr/bin/

# expose sftp port, which is 22
EXPOSE 22

#script to keep alive the process
ENTRYPOINT ["keepalive.sh"]
