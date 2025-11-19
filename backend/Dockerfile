FROM --platform=linux/amd64 ruby:3.2.2
RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3002

CMD ["rails", "server", "-b", "0.0.0.0"]

# FROM ruby:3.2.3

# ENV LANG C.UTF-8
# ENV TZ Asia/Tokyo

# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
#     && wget --quiet -O - /tmp/pubkey.gpg https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
#     && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
#     && apt-get update -qq \
#     && apt-get install -y nodejs yarn

# RUN gem install rails -v 7.2.2.1
# ENV PATH="$PATH:/usr/local/bundle/bin"
# RUN apt-get update -qq && apt-get install -y postgresql-client

# RUN mkdir /enviroment_to_try
# WORKDIR /enviroment_to_try
# COPY Gemfile /enviroment_to_try/
# COPY Gemfile.lock /enviroment_to_try/
# RUN bundle install
# # COPY package.json yarn.lock ./
# # COPY package.json ./
# # RUN yarn install
# COPY . .

# RUN echo "Dockerfile.lock created" > Dockerfile.lock

# CMD ["rails", "server", "-b", "0.0.0.0"]
# # Dockerイメージ内のコンテナが起動されたときに自動的に実行されるデフォルトのコマンドを指定するためのDockerfileの命令
