while [[ true ]]; 
do
	a=`git ls-remote https://github.com/phoenixTW/Adda.git HEAD | cut -c1-40`
	b=`git rev-parse HEAD`
	if [ "$a" != "$b" ]
		then
			echo $a
			echo $b
			echo -e '/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a Need to update'
			sh shellCommands/pullCommit.sh
		else
			echo "No Update Available"
	fi
	sleep 2m
done