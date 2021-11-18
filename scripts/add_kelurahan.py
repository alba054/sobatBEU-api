import json
import requests

url = 'https://api.irondesa.id/api/irondesa/wilayah/find_all/127-222'
data = requests.post(url, headers={'token': 'u3mrb78piltp1b36s3ec8hkp8vq0vtun'})
kecamatan = json.loads(data.content)['data']
i = 1
for k in kecamatan:
    url = 'https://api.irondesa.id/api/irondesa/wilayah/find_all/127-222'
    url += '-' + k['id_kecamatan']
    data = requests.post(url, headers={'token': 'u3mrb78piltp1b36s3ec8hkp8vq0vtun'})
    kelurahan = json.loads(data.content)['data']
    for kel in kelurahan:
        payload = {
        "provinceName": kel['nama_provinsi'],
        "kabupatenName": kel['nama_kabupaten'],
        "kecamatanName": kel['nama_kecamatan'],
        "kelurahanId": kel['id_desa'],
        "kelurahanCode": kel['nomor_desa'],
        "kelurahanName": kel['nama_desa']
        }

        requests.post(f'http://localhost:5000/api/wilayah/127-222-{k["id_kecamatan"]}', data=payload, headers={'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWI6OmxvZ2luOjpzeXNhZG1pbiIsImV4cCI6MTYzNzMyMzgzNiwiaWF0IjoxNjM3MjM3NDM2fQ.fE6HFYmLkq0aVlsorEh7C183PIA-phDUa-JxPQET7vA'})
        # kelurahan.append(kel)
        print(i)
        i += 1