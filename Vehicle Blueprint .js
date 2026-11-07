// النظام التفاعلي والحاسبة الذكية للتواريخ
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التعامل مع نموذج بيانات المالك والمركبة
    const ownerForm = document.getElementById('ownerForm');
    const resultContainer = document.getElementById('resultContainer');

    ownerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('ownerName').value;
        const age = document.getElementById('ownerAge').value;
        const vehicle = document.getElementById('vehicleType').value;
        const model = document.getElementById('carModel').value;
        const color = document.getElementById('carColor').value;
        const plate = document.getElementById('carPlate').value;

        document.getElementById('resName').textContent = name;
        document.getElementById('resAge').textContent = age + ' سنة';
        document.getElementById('resVehicle').textContent = vehicle;
        document.getElementById('resModel').textContent = model;
        document.getElementById('resColor').textContent = color;
        document.getElementById('resPlate').textContent = plate;

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // 2. حاسبة تاريخ الصلاحية والإنهاء التلقائي لقطع الغيار
    const partTrackerForm = document.getElementById('partTrackerForm');
    const trackerResult = document.getElementById('trackerResult');
    const calcOutput = document.getElementById('calcOutput');

    partTrackerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedPart = document.getElementById('selectPart').value;
        const installDateStr = document.getElementById('installDate').value;

        if (!installDateStr) return;

        let installDate = new Date(installDateStr);
        let expiryDate = new Date(installDate);
        let partNameArabic = "";

        switch(selectedPart) {
            case 'engine_oil':
                expiryDate.setMonth(expiryDate.getMonth() + 6);
                partNameArabic = "زيت المحرك";
                break;
            case 'brake_pads':
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                partNameArabic = "تيل الفرامل";
                break;
            case 'timing_belt':
                expiryDate.setFullYear(expiryDate.getFullYear() + 2);
                partNameArabic = "سير التايمنج";
                break;
            case 'battery':
                expiryDate.setMonth(expiryDate.getMonth() + 18);
                partNameArabic = "بطارية السيارة";
                break;
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedExpiry = expiryDate.toLocaleDateString('ar-EG', options);

        calcOutput.textContent = `قطعة (${partNameArabic}) التي تم تركيبها بتاريخ (${installDateStr}) تنتهي صلاحيتها أو موعد فحصها القادم بتاريخ: ${formattedExpiry}`;
        
        trackerResult.style.display = 'block';
    });

    // 3. نظام الإشعارات الذكية للصيانة
    const notifyBtn = document.getElementById('notifyBtn');
    const notificationArea = document.getElementById('notificationArea');

    const maintenanceAlerts = [
        "تنبيه ذكي: موعدك القادم لتغيير زيت المحرك اقترب بعد 500 كم!",
        "تحذير لمركبتك: يرجى فحص تيل الفرامل قريباً لضمان الأمان أثناء القيادة.",
        "تنبيه: ميعاد فحص دوري لسير التايمنج وبطارية السيارة.",
        "حالة النظام ممتازة: جميع قطع الهيكل الأساسي والشاسيه مستقرة."
    ];

    if (notifyBtn) {
        notifyBtn.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * maintenanceAlerts.length);
            const selectedAlert = maintenanceAlerts[randomIndex];

            notificationArea.textContent = selectedAlert;
            notificationArea.style.opacity = '0';
            let opacity = 0;
            
            let fadeIn = setInterval(function() {
                if (opacity < 1) {
                    opacity += 0.1;
                    notificationArea.style.opacity = opacity;
                } else {
                    clearInterval(fadeIn);
                }
            }, 50);
        });
    }
});