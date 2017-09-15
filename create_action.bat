cd actions
xcopy .\template\* .\%1\*
cd %1
rename context.js context_%1.js
rename template.txt template_%1.txt
pause