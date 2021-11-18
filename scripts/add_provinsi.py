import json
import requests

ID = 'id_provinsi'
NAMA_PROVINSI = 'nama_provinsi'

with open('C:\\Users\\Asus\\Documents\\documented archieve\\Personal\\IronDS\\provinsi.json') as f:
    s = f.read()

provinsi = json.loads(s)['data']
i = 1
for p in provinsi:
    payload = {'provinceId': p[ID], 'provinceName': p[NAMA_PROVINSI]}
    requests.post('http://localhost:5000/api/provinsi', data=payload, headers={'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWI6OmxvZ2luOjpzeXNhZG1pbiIsImV4cCI6MTYzNzMyMzgzNiwiaWF0IjoxNjM3MjM3NDM2fQ.fE6HFYmLkq0aVlsorEh7C183PIA-phDUa-JxPQET7vA'})
    print(i)
    i += 1