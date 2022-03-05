FROM ubuntu:latest

RUN apt update && apt install  openssh-server sudo -y
RUN useradd -m -s /bin/bash snowman
RUN echo "sig21CTF{weak_password_not_good_right?}" > /home/snowman/user.txt
RUN echo "snowman:martha" | chpasswd
RUN sed -i "s/#Port 22/Port 2223/g" /etc/ssh/sshd_config
RUN service ssh start

EXPOSE 2223
CMD ["/usr/sbin/sshd","-D"]
