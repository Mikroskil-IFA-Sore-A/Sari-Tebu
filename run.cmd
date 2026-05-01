@ECHO OFF
PUSHD backend
START CMD /k "npm run start"
POPD

PUSHD frontend
START CMD /k "npm run start"
POPD