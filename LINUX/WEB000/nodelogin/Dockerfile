FROM ubuntu:latest

# Create app directory
WORKDIR /var/www/html/sig21CTF/webapp

# Install app dependencies

COPY package*.json ./
RUN yes | apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y netcat
RUN apt-get install -y vim
RUN apt-get install -y ncat
RUN apt-get install -y sudo
RUN apt-get install -y zsh
RUN apt-get install -y openssh-server
RUN apt-get install -y npm
RUN npm install

# configuring the system
RUN echo "root:kLqeRS87Z3LUWdchAMTs" | chpasswd
RUN useradd abu -m
RUN useradd nodeapp
RUN echo "abu:WZd8gvSakFFUL8Me8gza" | chpasswd
RUN echo "abu:WZd8gvSakFFUL8Me8gza" > /opt/.passwd.bak
RUN echo "sig21CTF{n0t_0nl7_c4t_c4n_v13w_f1l3s}" > /var/www/html/sig21CTF/webapp/flag2.txt
USER abu
RUN echo "sig21CTF{1_though7_1t_w4s_s3cur3d_t0_st0r3_th3_55h_k3y5_h3r3}" > /home/abu/flag3.txt
RUN chmod o-xrw /home/abu/flag3.txt
USER root
RUN echo "sig21CTF{y0u_ju5t_g0tt4_l34rn_5tuff_0n_y0ur_0wn}" > /root/flag4.txt
RUN echo "abu\tALL=(ALL) /usr/bin/vim" >> /etc/sudoers
RUN sed -i "s/#Port 22/Port 2222/g" /etc/ssh/sshd_config
# RUN sed -i "s/#ListenAddress 0.0.0.0/ListenAddress 127.0.0.1/g" /etc/ssh/sshd_config
RUN service ssh start
COPY . .
RUN chmod +x wrapper.sh
RUN chmod +x startnode.sh
RUN rm Dockerfile
EXPOSE 3000
EXPOSE 2222

# using the app as normal user
USER nodeapp
RUN node login.js &
CMD [ "./wrapper.sh" ]
USER root
RUN sed -i 's/kLqeRS87Z3LUWdchAMTs//g' /var/www/html/sig21CTF/webapp/wrapper.sh
