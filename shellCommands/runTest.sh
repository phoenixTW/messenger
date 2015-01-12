sh shellCommands/deleteDB.sh
sh shellCommands/initdb.sh
npm run test 2>error
a=`cat error | wc -c`

if [ $a == 0 ]
	then
		echo "success"
	else
		rm -rf error
		git --no-pager show -s --format='%an <%ae>'| cut -c10-15
		# for (( ; ; ))
		# do
			C:/Program\ Files\ \(x86\)/VideoLAN/VLC/vlc.exe "tune/alert.mp3" vlc://quit
		# done	
fi

rm -rf error