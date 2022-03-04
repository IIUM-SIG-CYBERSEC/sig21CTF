FROM ubuntu:latest

# Install challenge dependencies
RUN yes | apt-get update
RUN apt-get install -y vim
RUN apt-get install -y sudo
RUN apt-get install -y cron
RUN apt-get install -y python
RUN apt-get install -y socat
RUN apt-get install -y net-tools
RUN apt-get install -y curl
RUN apt-get install -y wget

# cron stuff
COPY backup-cron /etc/cron.d/backup-cron
RUN chmod 0644 /etc/cron.d/backup-cron
RUN crontab /etc/cron.d/backup-cron
RUN touch /var/log/cron.log

# configuring the system 
RUN echo "root:VLRn8Hq97J4VzVZUZkM6" | chpasswd
RUN useradd linuxuser -m
RUN echo "linuxuser:55p7w2G7hVcs4tvxSGw5" | chpasswd
WORKDIR /home/linuxuser
USER linuxuser
COPY backup.sh /home/linuxuser/backup.sh
COPY lin001.sh /home/linuxuser/lin001.sh
COPY socatrun.sh /home/linuxuser/socatrun.sh
USER root
RUN chmod 0744 /home/linuxuser/backup.sh
RUN chmod 0744 /home/linuxuser/lin001.sh
RUN chmod 0744 /home/linuxuser/socatrun.sh
RUN chown linuxuser:linuxuser /home/linuxuser/backup.sh
RUN chown linuxuser:linuxuser /home/linuxuser/lin001.sh
RUN chown linuxuser:linuxuser /home/linuxuser/socatrun.sh

# echoing the flags
RUN echo "sig21CTF{44bfb2de767c19df0b050ca8053255ee}" > /usr/lib/apt/flag1.txt
RUN echo "sig21CTF{ebfef6e97d2816fb6fc16aee68f62bf2}" > /root/flag2.txt
RUN chown linuxuser:linuxuser /usr/lib/apt/flag1.txt

# exposing and running crontab as root
EXPOSE 1337

USER linuxuser
CMD [ "/home/linuxuser/socatrun.sh" ]
RUN sed -i 's/VLRn8Hq97J4VzVZUZkM6//g' /home/linuxuser/socatrun.sh  