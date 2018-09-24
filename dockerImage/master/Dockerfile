FROM jenkins/jenkins:latest

USER root

RUN apt-get update
RUN apt-get install -y aptitude
RUN aptitude upgrade -y
RUN aptitude install -y openssh-server \
                        wget \
                        python \
                        python-pip \
                        rpm2cpio \
                        cpio

#Clean packages
RUN aptitude clean

#Install maven
ARG MAVEN_VERSION=3.3.9
ENV MAVEN_URL http://ftp.halifax.rwth-aachen.de
ENV MAVEN_PKG ${MAVEN_URL}/apache/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz
ENV MAVEN_HOME /opt/apache-maven-${MAVEN_VERSION}
ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:${MAVEN_HOME}/bin WORKDIR /opt
RUN curl ${MAVEN_PKG} | tar xz

#Installs Ant
ARG ANT_VERSION=1.10.5
RUN cd && \
    wget -q http://www.us.apache.org/dist//ant/binaries/apache-ant-${ANT_VERSION}-bin.tar.gz && \
    tar -xzf apache-ant-${ANT_VERSION}-bin.tar.gz && \
    mv apache-ant-${ANT_VERSION} /opt/ant && \
    rm apache-ant-${ANT_VERSION}-bin.tar.gz
ENV ANT_HOME /opt/ant
ENV PATH ${PATH}:/opt/ant/bin

#Install IIB with healthpack
RUN mkdir -p /opt/emageon/iib
COPY files/iib-10.0.0.5 /opt/emageon/iib/iib-10.0.0.5
COPY files/HealthcarePack /opt/emageon/iib/HealthcarePack
RUN ./opt/emageon/iib/iib-10.0.0.5/iib make registry global accept license silently
RUN usermod -a -G mqbrkrs jenkins
RUN ./opt/emageon/iib/HealthcarePack/4.0.0.0/HealthcarePack_install.sh /opt/emageon/iib/iib-10.0.0.5/ accept license silently

#Install Jenkins plugins
RUN /usr/local/bin/install-plugins.sh git matrix-auth workflow-aggregator docker-workflow blueocean credentials-binding

ENV JENKINS_USER admin
ENV JENKINS_PASS admin

#Skip initial setup
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

COPY files/executors.groovy /usr/share/jenkins/ref/init.groovy.d/
COPY files/default-user.groovy /usr/share/jenkins/ref/init.groovy.d/

# Copy in script files
COPY files/*.sh /usr/local/bin/

RUN su - jenkins -c '. /opt/emageon/iib/iib-10.0.0.5/server/bin/mqsiprofile' \
    && chmod 755 /usr/local/bin/*

# Set BASH_ENV to source mqsiprofile when using docker exec bash -c
ENV BASH_ENV=/usr/local/bin/iib_env.sh
