import json
import requests

ID_PROVINSI = 'id_provinsi'
NAMA_PROVINSI = 'nama_provinsi'
ID_KABUPATEN = 'id_kabupaten'
KODE_KABUPATEN = 'nomor_kabupaten'
NAMA_KABUPATEN = 'nama_kabupaten'


with open('C:\\Users\\Asus\\Documents\\documented archieve\\Personal\\IronDS\\kabupaten.json') as f:
    s = f.read()

kabupaten = json.loads(s)['data']
i = 1
for p in kabupaten:
    payload = {
        'provinceId': p[ID_PROVINSI],
        'provinceName': p[NAMA_PROVINSI],
        'kabupatenId': p[ID_KABUPATEN],
        'kabupatenCode': p[KODE_KABUPATEN],
        'kabupatenName': p[NAMA_KABUPATEN]
        }
    
    res = requests.post('http://localhost:5000/api/wilayah/127', data=payload, headers={'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWI6OmxvZ2luOjpzeXNhZG1pbiIsImV4cCI6MTYzNzMyMzgzNiwiaWF0IjoxNjM3MjM3NDM2fQ.fE6HFYmLkq0aVlsorEh7C183PIA-phDUa-JxPQET7vA'})
    print(i)
    i += 1