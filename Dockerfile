FROM electronuserland/builder:wine-mono

WORKDIR /workspace

COPY . /workspace

RUN npm install

CMD ["npm", "run", "build"]
