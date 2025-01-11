import requests
from bs4 import BeautifulSoup
import chardet
import google.generativeai as genai
from datetime import datetime, timedelta
import json
import time


license_number = '63B02028'
def summary_muc_phat(muc_phat):
    # print('hello')
    # thoi_gian_vi_pham = '10:48, 01/04/2023'
    # muc_phat = 'Theo Nghị định 100/2019/NĐ-CP, mức phạt cho lỗi điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h là 800,000-1,000,000 đồng đối với xe ô tô.\r\n\r\nĐiều này có nghĩa là, khi bạn điều khiển xe của mình trên đường, bạn cần tuân thủ tốc độ tối đa cho phép. Đối với mỗi khu vực, tốc độ tối đa cho phép có thể khác nhau và thường được ghi trên các biển báo giao thông. Nếu bạn điều khiển xe của mình nhanh hơn tốc độ quy định từ 05 km/h đến dưới 10 km/h, bạn sẽ bị phạt theo quy định trên. \r\n\r\nVí dụ, nếu tốc độ quy định trên một con đường là 60 km/h và bạn điều khiển xe ở tốc độ 65 km/h đến dưới 70 km/h, bạn sẽ bị phạt 800,000-1,000,000 đồng.\r\n\r\nViệc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.'
    genai.configure(api_key="AIzaSyDcghjWBDx657lB6nKGR25BG4uN_n8d3RU")
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    response = model.generate_content(f"Tóm tắt cho tôi mức phạt : {muc_phat}, tôi chỉ cần giá tiền tôi đã bị phạt nếu có khoảng tiền từ a đến b lấy giá tiền theo dạng  a vnd,b vnd (để tôi dùng split dấu , trong python),nếu chỉ có a thid lấy giá theo a vnd, đưa ra số tiền tôi phải nộp phạt, trả về kết quả dạng và không cần giải thích gì thêm ")
    return response.text
    # print(response.text)
    # , và tính cho tôi số tiền a cùng với số tiền phần trăm cộng dồn 10% trên ngày của mức phạt đó tôi bị phạt từ ngày {thoi_gian_vi_pham} đến hiện tại, giống như việc qua mỗi ngày số tiền phạt của tôi tăng lên 10% từ số tiền bị phạt ban đầu ấy, 
def PhatNguoiXe(license_number):
    url = f'https://phatnguoixe.com/1026/?BienSo={license_number}&LoaiXe=1'
    data = requests.get(url)
    encoding = chardet.detect(data.content)['encoding']
    decoded_html = data.content.decode(encoding)
    # print(decoded_html)

    soup = BeautifulSoup(decoded_html, 'html.parser')
    extracted_data = []
    summary = soup.find('h3', class_='css-1oevxvn')
    if summary:
        extracted_data.append(summary.get_text(strip=True))

    buttons = soup.select('div[style="margin-top:-5px;"] button.css-tt')
    for button in buttons:
        extracted_data.append(button.get_text(strip=True))

    rows = soup.select('div.body_table tr.td_left')
    for row in rows:
        label = row.find('td', class_='row_left')
        value = row.find('td', class_='row_right')
        if label and value:
            extracted_data.append(f"{label.get_text(strip=True)} {value.get_text(strip=True)}")

    # result = '\n'.join(extracted_data)
    print(extracted_data)

def PhatNguoi(license_number):
    url = "https://phatnguoi.com/action.php"
    form_data = {
        "type": 1,
        "retry": 1,
        "loaixe": 1,
        "bsx": license_number,
        "bsxdangkiem": "",
        "bien": "T",
        "tem": "",
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Referer": "https://phatnguoi.com",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    bypass =  '{"license_plate":"63B02028","captcha_status":"valid"}'
    cookies = {
        "vehicle_data" : bypass,
    }

    response = requests.post(url, data=form_data, headers=headers, cookies=cookies)
    print("Status Code:", response.status_code)
    # print("Response:", response.json())
    data = response.json()
    # data = {'biensoxe': '63B-020.28', 'totalViolations': 2, 'is_new': True, 'handledCount': 1, 'unhandledCount': 1, 'updated_at': '2025-01-06 09:45:29', 'violations': [{'trang_thai': 'ĐÃ XỬ PHẠT', 'bien_kiem_sat': '63B02028', 'mau_bien': 'Nền màu vàng, chữ và số màu đen', 'loai_phuong_tien': 'Ô tô', 'thoi_gian_vi_pham': '10:48, 01/04/2023', 'dia_diem_vi_pham': 'Km1762+150, Quốc lộ 1A - Bình Thuận', 'hanh_vi_vi_pham': '12321.5.3.a.01.Điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h', 'don_vi_phat_hien_vi_pham': 'ĐỘI TT, ĐTGQTNGT VÀ XLVP - PHÒNG CSGT BÌNH THUẬN', 'noi_giai_quyet_vu_viec': '\\n 1. ĐỘI TT, ĐTGQTNGT VÀ XLVP - PHÒNG CSGT BÌNH THUẬN\\nĐịa chỉ: 115 Tôn Đức Thắng, TP. Phan Thiết\\nSố điện thoại liên hệ: 0693428184\\n2. Đội Cảnh sát giao thông, Trật tự - Công an huyện Chợ Gạo - Tỉnh Tiền Giang\\nĐịa chỉ: huyện Chợ Gạo\\n', 'so_dien_thoai': '0693428184', 'muc_phat': 'Theo Nghị định 100/2019/NĐ-CP, mức phạt cho lỗi điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h là 800,000-1,000,000 đồng đối với xe ô tô.\r\n\r\nĐiều này có nghĩa là, khi bạn điều khiển xe của mình trên đường, bạn cần tuân thủ tốc độ tối đa cho phép. Đối với mỗi khu vực, tốc độ tối đa cho phép có thể khác nhau và thường được ghi trên các biển báo giao thông. Nếu bạn điều khiển xe của mình nhanh hơn tốc độ quy định từ 05 km/h đến dưới 10 km/h, bạn sẽ bị phạt theo quy định trên. \r\n\r\nVí dụ, nếu tốc độ quy định trên một con đường là 60 km/h và bạn điều khiển xe ở tốc độ 65 km/h đến dưới 70 km/h, bạn sẽ bị phạt 800,000-1,000,000 đồng.\r\n\r\nViệc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.'}, {'trang_thai': 'CHƯA XỬ PHẠT', 'bien_kiem_sat': '63B-020.28', 'mau_bien': 'Nền mầu trắng, chữ và số màu đen', 'loai_phuong_tien': 'Ô tô', 'thoi_gian_vi_pham': '17:48, 10/07/2019', 'dia_diem_vi_pham': 'Bạc Liêu', 'hanh_vi_vi_pham': None, 'don_vi_phat_hien_vi_pham': 'Đội 5, Công an  Bạc Liêu', 'noi_giai_quyet_vu_viec': '\\n 1. Đội 5, Công an  Bạc Liêu\\nĐịa chỉ: 593 Đường Trần Phú, Khóm 1, Phường 7, TP Bạc Liêu\\nSố điện thoại liên hệ: 02913678988\\n', 'so_dien_thoai': '02913678988'}], 'attempts': None, 'mdk': None, 'maubien': None, 'data_dangkiem': None, 'code': 1}
    print(f'Phát hiện {data['totalViolations']} lỗi vi phạm cho biển số {license_number} \n')
    violation = 1
    
    for i in data['violations']:
        if 'muc_phat' in i:  # Kiểm tra nếu key 'muc_phat' tồn tại
            muc_phat = summary_muc_phat(i['muc_phat'])
            # print(f"Mức phạt: {muc_phat}")
        else:
            muc_phat = "Không có thông tin mức phạt \n"
        # print(summary_muc_phat(i['muc_phat']))
        print(f'''Lỗi {violation} : {i['trang_thai']} \nMàu Biển : {i['mau_bien']} \nLoại Xe : {i['loai_phuong_tien']} \nThời Gian : {i['thoi_gian_vi_pham']} \nTại Địa Điểm : {i['dia_diem_vi_pham']} \nLỗi Do : {i['hanh_vi_vi_pham']} \nĐơn Phát Hiện : {i['don_vi_phat_hien_vi_pham']} \nBị Phạt : {muc_phat} \nLiên Hệ : {i['so_dien_thoai']} để biết thêm thông tin''')
        violation += 1    

PhatNguoi('63B02028')    


   