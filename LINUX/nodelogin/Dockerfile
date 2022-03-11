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
RUN useradd abu -m -s /bin/bash
RUN useradd sshuser -m
RUN useradd nodeapp
RUN echo "abu:WZd8gvSakFFUL8Me8gza" | chpasswd
RUN echo "sshuser:qP9jjbYeWzf7zs9t" | chpasswd
RUN echo "nodeapp:nodeapp"
RUN echo "abu:WZd8gvSakFFUL8Me8gza" > /opt/.passwd.bak
RUN echo "sig21CTF{n0t_0nl7_c4t_c4n_v13w_f1l3s}" > /var/www/html/sig21CTF/webapp/flag2.txt
USER sshuser
RUN echo "sig21CTF{1_though7_1t_w4s_s3cur3d_t0_st0r3_th3_55h_k3y5_h3r3}" > /home/sshuser/flag3.txt
RUN chmod o-xrw /home/sshuser/flag3.txt
USER abu
RUN echo "sig21CTF{643628b8b7e514bb557211424e3796f4}" > /home/abu/flag4.txt
RUN chmod o-xrw /home/abu/flag4.txt
USER root
RUN echo "sig21CTF{y0u_ju5t_g0tt4_l34rn_5tuff_0n_y0ur_0wn}" > /root/flag5.txt
RUN echo "abu\tALL=(ALL) /usr/bin/vim" >> /etc/sudoers
RUN echo "# sig21CTF{52eaf68fadf470e9c993efb54a26ba35} flag6" >> /etc/ssh/sshd_config
RUN service ssh start
COPY . .
RUN chmod +x wrapper.sh
RUN rm Dockerfile

# using the app as normal user
USER nodeapp
CMD [ "./wrapper.sh" ]
USER root
RUN sed -i 's/kLqeRS87Z3LUWdchAMTs//g' /var/www/html/sig21CTF/webapp/wrapper.sh
RUN sed -i 's/dgBfidefVNhZQEZUDeQQ//g' /var/www/html/sig21CTF/webapp/wrapper.sh
