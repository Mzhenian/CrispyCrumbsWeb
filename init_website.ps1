#! powershell

# insure CrispyCrumbs server is running
$port = 1324
$serverRunning = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue) -ne $null
# todo add check it's our server
if (-not $serverRunning) {
  cd ..\CrispyCrumbsServer
  # todo kill the job when closing the website, and not just when closing the terminal
  $serverJob = Start-Job -ScriptBlock {
    & .\init_server.ps1
  }
  cd ..\CrispyCrumbsWeb
}

npm install
npm start
