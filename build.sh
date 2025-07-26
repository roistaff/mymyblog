#!/bin/bash
num=$(ls -1 posts/ | wc -l)
count=0
f_json=""
for file in $(ls -1 -t posts/); do
	filename="posts/${file}"
	title=$(cat "posts/${file}" | grep -oP 'Title:"\K[^"]+')
	date=$(cat "posts/${file}" | grep -oP 'Date:"\K[^"]+')
	tags=$(cat "posts/${file}" | grep -oP 'Tags:"\K[^"]+')
	echo "${title} | ${date} | ${tags}"
	echo "generate html..."
	pandoc ${filename} --template=main.html --metadata title=${title} --metadata date=${date} --metadata tags=${tags} -o "public/${file%.md}.html"
	echo "generate json"
	json_tags=$(echo "$tags" | sed 's/,/","/g' | sed 's/^/"/;s/$/"/')
	json=$(printf '{"title":"%s","date":"%s","tags":[%s],"url":"%s"}' $title $date $json_tags "public/${file%.md}.html")
	((count++))
	if [ "$count" -eq 1 ]; then
		f_json="[${json},"
	elif [ "$count" -eq "$num" ]; then
		f_json="${f_json}${json}]"
	else
		f_json="${f_json}${json},"
	fi

	echo  "-------------------------------"
done
echo $f_json | jq . > public/posts.json
