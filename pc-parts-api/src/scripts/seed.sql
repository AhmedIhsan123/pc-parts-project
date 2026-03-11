USE pcparts;
-- Insert Categories
INSERT INTO categories (category) VALUES
('CPU'),
('GPU'),
('Motherboard'),
('Power Supply'),
('Case'),
('Ram'),
('Storage');

-- =========================
-- CPU
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('CPU','Intel Core i9-14900K','Intel','24-core flagship gaming and productivity CPU','{"cores":24,"threads":32,"base_clock":"3.2 GHz","boost_clock":"6.0 GHz","socket":"LGA1700","tdp":"125W"}',589.99,25,TRUE,'/images/cpu/i9-14900k.png', 4.8),
('CPU','AMD Ryzen 9 7950X3D','AMD','16-core 3D V-Cache CPU optimized for gaming','{"cores":16,"threads":32,"base_clock":"4.2 GHz","boost_clock":"5.7 GHz","socket":"AM5","tdp":"120W"}',699.99,20,TRUE,'/images/cpu/7950x3d.png', 4.9),
('CPU','Intel Core i7-14700K','Intel','20-core high-performance CPU for gaming and multitasking','{"cores":20,"threads":28,"base_clock":"3.4 GHz","boost_clock":"5.6 GHz","socket":"LGA1700","tdp":"125W"}',419.99,30,TRUE,'/images/cpu/i7-14700k.png', 4.7),
('CPU','AMD Ryzen 7 7800X3D','AMD','8-core 3D V-Cache CPU for ultra gaming performance','{"cores":8,"threads":16,"base_clock":"4.2 GHz","boost_clock":"5.0 GHz","socket":"AM5","tdp":"105W"}',449.99,35,TRUE,'/images/cpu/7800x3d.png', 4.9),
('CPU','Intel Core i5-14600K','Intel','Mid-high tier 14-core gaming CPU','{"cores":14,"threads":20,"base_clock":"3.5 GHz","boost_clock":"5.1 GHz","socket":"LGA1700","tdp":"125W"}',319.99,40,TRUE,'/images/cpu/i5-14600k.png', 4.6),
('CPU','AMD Ryzen 9 7900X','AMD','12-core high-performance CPU for productivity','{"cores":12,"threads":24,"base_clock":"4.7 GHz","boost_clock":"5.6 GHz","socket":"AM5","tdp":"170W"}',549.99,18,TRUE,'/images/cpu/7900x.png', 4.5),
('CPU','Intel Core i9-13900KS','Intel','Special edition 6GHz CPU for extreme performance','{"cores":24,"threads":32,"base_clock":"3.0 GHz","boost_clock":"6.0 GHz","socket":"LGA1700","tdp":"150W"}',699.99,10,TRUE,'/images/cpu/i9-13900ks.png', 4.7),
('CPU','AMD Ryzen 7 7700X','AMD','8-core Zen 4 processor for gaming and content creation','{"cores":8,"threads":16,"base_clock":"4.5 GHz","boost_clock":"5.4 GHz","socket":"AM5","tdp":"105W"}',349.99,28,TRUE,'/images/cpu/7700x.png', 4.5),
('CPU','Intel Core i5-13600K','Intel','Excellent value CPU with hybrid architecture','{"cores":14,"threads":20,"base_clock":"3.5 GHz","boost_clock":"5.1 GHz","socket":"LGA1700","tdp":"125W"}',299.99,45,TRUE,'/images/cpu/i5-13600k.png', 4.8),
('CPU','AMD Ryzen 5 7600X','AMD','6-core efficient gaming CPU','{"cores":6,"threads":12,"base_clock":"4.7 GHz","boost_clock":"5.3 GHz","socket":"AM5","tdp":"105W"}',249.99,50,TRUE,'/images/cpu/7600x.png', 4.7);

-- =========================
-- GPU
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('GPU','NVIDIA RTX 4090','NVIDIA','Flagship 4K GPU with 24GB VRAM','{"vram":"24GB GDDR6X","boost_clock":"2.52 GHz","power_draw":"450W","ray_tracing":true}',1599.99,15,TRUE,'/images/gpu/rtx4090.png', 4.6),
('GPU','NVIDIA RTX 4080 Super','NVIDIA','High-end 4K GPU optimized for gaming','{"vram":"16GB GDDR6X","boost_clock":"2.52 GHz","power_draw":"320W","ray_tracing":true}',999.99,20,TRUE,'/images/gpu/rtx4080s.png', 4.9),
('GPU','NVIDIA RTX 4070 Ti Super','NVIDIA','Premium 1440p gaming GPU','{"vram":"12GB GDDR6X","boost_clock":"2.61 GHz","power_draw":"285W","ray_tracing":true}',799.99,30,TRUE,'/images/gpu/rtx4070tis.png', 4.8),
('GPU','AMD RX 7900 XTX','AMD','Flagship RDNA3 GPU with 24GB VRAM','{"vram":"24GB GDDR6","boost_clock":"2.5 GHz","power_draw":"355W","ray_tracing":true}',999.99,18,TRUE,'/images/gpu/7900xtx.png', 4.7),
('GPU','AMD RX 7900 XT','AMD','High performance 4K GPU','{"vram":"20GB GDDR6","boost_clock":"2.4 GHz","power_draw":"300W","ray_tracing":true}',849.99,22,TRUE,'/images/gpu/7900xt.png', 4.8),
('GPU','NVIDIA RTX 4070 Super','NVIDIA','Efficient 1440p GPU','{"vram":"12GB GDDR6X","boost_clock":"2.61 GHz","power_draw":"285W","ray_tracing":true}',599.99,40,TRUE,'/images/gpu/rtx4070s.png', 4.6),
('GPU','AMD RX 7800 XT','AMD','1440p gaming GPU','{"vram":"16GB GDDR6","boost_clock":"2.3 GHz","power_draw":"230W","ray_tracing":true}',499.99,35,TRUE,'/images/gpu/7800xt.png', 4.7),
('GPU','NVIDIA RTX 4060 Ti 16GB','NVIDIA','Midrange GPU with 16GB VRAM','{"vram":"16GB GDDR6","boost_clock":"2.4 GHz","power_draw":"220W","ray_tracing":true}',499.99,50,TRUE,'/images/gpu/4060ti.png', 4.5),
('GPU','AMD RX 7700 XT','AMD','Upper midrange GPU','{"vram":"12GB GDDR6","boost_clock":"2.2 GHz","power_draw":"180W","ray_tracing":true}',449.99,45,TRUE,'/images/gpu/7700xt.png', 4.4),
('GPU','NVIDIA RTX 4060','NVIDIA','Entry-level RTX GPU','{"vram":"8GB GDDR6","boost_clock":"1.83 GHz","power_draw":"170W","ray_tracing":true}',299.99,60,TRUE,'/images/gpu/4060.png', 4.5);

-- =========================
-- Motherboard
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('Motherboard','ASUS ROG Maximus Z790 Hero','ASUS','High-end Intel Z790 motherboard','{"socket":"LGA1700","chipset":"Z790","memory_support":"DDR5","m2_slots":5,"form_factor":"ATX"}',629.99,15,TRUE,'/images/mobo/z790hero.png', 4.3),
('Motherboard','MSI MEG X670E Godlike','MSI','Premium AMD AM5 motherboard','{"socket":"AM5","chipset":"X670E","memory_support":"DDR5","m2_slots":5,"form_factor":"E-ATX"}',699.99,10,TRUE,'/images/mobo/x670egodlike.png', 4.2),
('Motherboard','Gigabyte Z790 Aorus Master','Gigabyte','High-end Intel board','{"socket":"LGA1700","chipset":"Z790","memory_support":"DDR5","m2_slots":5,"form_factor":"ATX"}',499.99,20,TRUE,'/images/mobo/z790aorus.png', 4.8),
('Motherboard','ASUS ROG Crosshair X670E Hero','ASUS','Premium AMD AM5 motherboard','{"socket":"AM5","chipset":"X670E","memory_support":"DDR5","m2_slots":5,"form_factor":"ATX"}',599.99,18,TRUE,'/images/mobo/x670hero.png', 4.9),
('Motherboard','MSI MPG Z790 Carbon WiFi','MSI','High-end gaming motherboard','{"socket":"LGA1700","chipset":"Z790","memory_support":"DDR5","m2_slots":4,"form_factor":"ATX"}',399.99,25,TRUE,'/images/mobo/z790carbon.png', 4.7),
('Motherboard','Gigabyte X670E Aorus Master','Gigabyte','High-performance AM5 motherboard','{"socket":"AM5","chipset":"X670E","memory_support":"DDR5","m2_slots":5,"form_factor":"ATX"}',499.99,22,TRUE,'/images/mobo/x670eaorus.png', 4.8),
('Motherboard','ASRock Z790 Taichi','ASRock','Premium Intel motherboard','{"socket":"LGA1700","chipset":"Z790","memory_support":"DDR5","m2_slots":5,"form_factor":"ATX"}',469.99,17,TRUE,'/images/mobo/z790taichi.png', 4.6),
('Motherboard','MSI MAG B650 Tomahawk','MSI','Value AM5 motherboard','{"socket":"AM5","chipset":"B650","memory_support":"DDR5","m2_slots":4,"form_factor":"ATX"}',219.99,40,TRUE,'/images/mobo/b650tomahawk.png', 4.7),
('Motherboard','ASUS TUF Gaming Z790-Plus','ASUS','Durable gaming motherboard','{"socket":"LGA1700","chipset":"Z790","memory_support":"DDR5","m2_slots":4,"form_factor":"ATX"}',249.99,35,TRUE,'/images/mobo/tufoz790.png', 4.5),
('Motherboard','Gigabyte B650 Aorus Elite','Gigabyte','Midrange AM5 motherboard','{"socket":"AM5","chipset":"B650","memory_support":"DDR5","m2_slots":4,"form_factor":"ATX"}',229.99,38,TRUE,'/images/mobo/b650elite.png', 4.4);

-- =========================
-- Power Supply
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('Power Supply','Corsair AX1600i','Corsair','1600W Titanium PSU','{"wattage":1600,"efficiency":"Titanium","modular":true,"form_factor":"ATX"}',599.99,10,TRUE,'/images/psu/ax1600i.png', 4.4),
('Power Supply','Seasonic Prime TX-1300','Seasonic','1300W Titanium PSU','{"wattage":1300,"efficiency":"Titanium","modular":true,"form_factor":"ATX"}',449.99,15,TRUE,'/images/psu/primetx1300.png', 4.3),
('Power Supply','EVGA SuperNOVA 1200 P3','EVGA','1200W Platinum PSU','{"wattage":1200,"efficiency":"Platinum","modular":true,"form_factor":"ATX"}',349.99,20,TRUE,'/images/psu/1200p3.png', 4.6),
('Power Supply','Corsair RM1000x','Corsair','1000W Gold PSU','{"wattage":1000,"efficiency":"Gold","modular":true,"form_factor":"ATX"}',189.99,40,TRUE,'/images/psu/rm1000x.png', 4.9),
('Power Supply','Seasonic Focus GX-850','Seasonic','850W Gold PSU','{"wattage":850,"efficiency":"Gold","modular":true,"form_factor":"ATX"}',139.99,50,TRUE,'/images/psu/gx850.png', 4.8),
('Power Supply','MSI MPG A1000G','MSI','1000W ATX 3.0 PSU','{"wattage":1000,"efficiency":"Gold","modular":true,"form_factor":"ATX"}',199.99,35,TRUE,'/images/psu/a1000g.png', 4.7),
('Power Supply','ASUS ROG Thor 1200P2','ASUS','1200W Platinum PSU','{"wattage":1200,"efficiency":"Platinum","modular":true,"form_factor":"ATX"}',399.99,15,TRUE,'/images/psu/thor1200.png', 4.8),
('Power Supply','be quiet! Dark Power 13 1000W','be quiet!','Silent Platinum PSU','{"wattage":1000,"efficiency":"Platinum","modular":true,"form_factor":"ATX"}',279.99,20,TRUE,'/images/psu/darkpower13.png', 4.6),
('Power Supply','Cooler Master V850 SFX','Cooler Master','850W SFX PSU','{"wattage":850,"efficiency":"Gold","modular":true,"form_factor":"SFX"}',169.99,30,TRUE,'/images/psu/v850sfx.png', 4.7),
('Power Supply','Thermaltake Toughpower GF3 1000W','Thermaltake','1000W ATX 3.0 Gold PSU','{"wattage":1000,"efficiency":"Gold","modular":true,"form_factor":"ATX"}',189.99,28,TRUE,'/images/psu/gf3.png', 4.3);

-- =========================
-- Case
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('Case','Lian Li O11 Dynamic EVO','Lian Li','Premium dual-chamber case','{"form_factor_support":["ATX","Micro-ATX","Mini-ITX"],"gpu_clearance":"430mm","radiator_support":"360mm","drive_bays":6}',169.99,40,TRUE,'/images/case/o11evo.png', 4.8),
('Case','Fractal Design Torrent','Fractal','High airflow case','{"form_factor_support":["ATX","Micro-ATX","Mini-ITX"],"gpu_clearance":"355mm","radiator_support":"360mm","drive_bays":5}',199.99,25,TRUE,'/images/case/torrent.png', 4.5),
('Case','NZXT H9 Elite','NZXT','Dual-chamber glass case','{"form_factor_support":["ATX","Micro-ATX","Mini-ITX"],"gpu_clearance":"400mm","radiator_support":"360mm","drive_bays":5}',239.99,20,TRUE,'/images/case/h9elite.png', 4.4),
('Case','Corsair 5000D Airflow','Corsair','High airflow mid tower','{"form_factor_support":["ATX","Micro-ATX","Mini-ITX"],"gpu_clearance":"360mm","radiator_support":"360mm","drive_bays":4}',149.99,50,TRUE,'/images/case/5000d.png', 4.6),
('Case','Phanteks NV7','Phanteks','Premium showcase case','{"form_factor_support":["ATX","Micro-ATX"],"gpu_clearance":"400mm","radiator_support":"360mm","drive_bays":6}',219.99,22,TRUE,'/images/case/nv7.png', 4.8),
('Case','Cooler Master HAF 700','Cooler Master','Large airflow case','{"form_factor_support":["E-ATX","ATX","Micro-ATX"],"gpu_clearance":"450mm","radiator_support":"420mm","drive_bays":7}',299.99,15,TRUE,'/images/case/haf700.png', 4.7),
('Case','Hyte Y60','Hyte','Panoramic glass case','{"form_factor_support":["ATX","Micro-ATX"],"gpu_clearance":"380mm","radiator_support":"360mm","drive_bays":5}',199.99,35,TRUE,'/images/case/y60.png', 4.6),
('Case','be quiet! Silent Base 802','be quiet!','Silent modular case','{"form_factor_support":["ATX","Micro-ATX"],"gpu_clearance":"360mm","radiator_support":"360mm","drive_bays":6}',179.99,30,TRUE,'/images/case/802.png', 4.7),
('Case','Thermaltake Tower 500','Thermaltake','Vertical showcase case','{"form_factor_support":["ATX","Micro-ATX"],"gpu_clearance":"400mm","radiator_support":"360mm","drive_bays":5}',169.99,28,TRUE,'/images/case/tower500.png', 4.5),
('Case','ASUS ROG Hyperion GR701','ASUS','Extreme full tower case','{"form_factor_support":["E-ATX","ATX"],"gpu_clearance":"450mm","radiator_support":"420mm","drive_bays":8}',299.99,20,TRUE,'/images/case/gr701.png', 4.8);

-- =========================
-- Ram
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('Ram','Corsair Dominator Platinum RGB 32GB','Corsair','High-speed DDR5 RAM','{"capacity":"32GB","speed":"6000MHz","type":"DDR5","cas_latency":30,"voltage":"1.35V"}',199.99,40,TRUE,'/images/ram/dominator32.png', 4.4),
('Ram','G.Skill Trident Z5 RGB 32GB','G.Skill','Premium DDR5 RAM','{"capacity":"32GB","speed":"6400MHz","type":"DDR5","cas_latency":32,"voltage":"1.35V"}',219.99,35,TRUE,'/images/ram/trident32.png', 4.6),
('Ram','Kingston Fury Beast 16GB','Kingston','Reliable DDR5 RAM','{"capacity":"16GB","speed":"5600MHz","type":"DDR5","cas_latency":36,"voltage":"1.25V"}',89.99,50,TRUE,'/images/ram/fury16.png', 4.5),
('Ram','Teamgroup T-Force Delta RGB 32GB','Teamgroup','High performance DDR5 RAM','{"capacity":"32GB","speed":"6000MHz","type":"DDR5","cas_latency":30,"voltage":"1.35V"}',189.99,38,TRUE,'/images/ram/tforce32.png', 4.3),
('Ram','Crucial Ballistix 16GB','Crucial','Efficient DDR5 RAM','{"capacity":"16GB","speed":"5200MHz","type":"DDR5","cas_latency":34,"voltage":"1.25V"}',79.99,45,TRUE,'/images/ram/ballistix16.png', 4.7),
('Ram','Corsair Vengeance RGB 16GB','Corsair','Reliable DDR5 RAM','{"capacity":"16GB","speed":"5600MHz","type":"DDR5","cas_latency":36,"voltage":"1.25V"}',89.99,48,TRUE,'/images/ram/vengeance16.png', 4.7),
('Ram','G.Skill Ripjaws V 16GB','G.Skill','Value DDR5 RAM','{"capacity":"16GB","speed":"5600MHz","type":"DDR5","cas_latency":36,"voltage":"1.25V"}',84.99,50,TRUE,'/images/ram/ripjaws16.png', 4.8),
('Ram','Kingston Fury Beast 32GB','Kingston','High-speed DDR5 RAM','{"capacity":"32GB","speed":"6000MHz","type":"DDR5","cas_latency":30,"voltage":"1.35V"}',179.99,35,TRUE,'/images/ram/fury32.png', 4.5),
('Ram','Teamgroup T-Force Xtreem 32GB','Teamgroup','Premium overclocked DDR5 RAM','{"capacity":"32GB","speed":"6400MHz","type":"DDR5","cas_latency":28,"voltage":"1.35V"}',239.99,25,TRUE,'/images/ram/xtreem32.png', 4.6),
('Ram','Crucial Ballistix 32GB','Crucial','Efficient DDR5 RAM','{"capacity":"32GB","speed":"6000MHz","type":"DDR5","cas_latency":30,"voltage":"1.35V"}',189.99,30,TRUE,'/images/ram/ballistix32.png', 4.6);

-- =========================
-- Storage
-- =========================
INSERT INTO products (category_name, product_name, brand, product_description, specs, price, stock, in_stock, image_url, rating) VALUES
('Storage','Samsung 980 Pro 2TB','Samsung','High-speed NVMe SSD','{"capacity":"2TB","interface":"PCIe 4.0","read_speed":"7000 MB/s","write_speed":"5100 MB/s","form_factor":"M.2 2280"}',249.99,40,TRUE,'/images/storage/980pro2tb.png', 4.4),
('Storage','WD Black SN850X 2TB','Western Digital','Gaming NVMe SSD','{"capacity":"2TB","interface":"PCIe 4.0","read_speed":"7300 MB/s","write_speed":"6600 MB/s","form_factor":"M.2 2280"}',229.99,35,TRUE,'/images/storage/sn850x2tb.png', 4.5),
('Storage','Seagate FireCuda 530 2TB','Seagate','High-performance NVMe SSD','{"capacity":"2TB","interface":"PCIe 4.0","read_speed":"7300 MB/s","write_speed":"6900 MB/s","form_factor":"M.2 2280"}',249.99,30,TRUE,'/images/storage/firecuda2tb.png', 4.3),
('Storage','Crucial P5 Plus 1TB','Crucial','Reliable NVMe SSD','{"capacity":"1TB","interface":"PCIe 4.0","read_speed":"6600 MB/s","write_speed":"5000 MB/s","form_factor":"M.2 2280"}',129.99,50,TRUE,'/images/storage/p5plus1tb.png', 4.6),
('Storage','Samsung 870 EVO 2TB','Samsung','Reliable SATA SSD','{"capacity":"2TB","interface":"SATA","read_speed":"560 MB/s","write_speed":"530 MB/s","form_factor":"2.5 inch"}',159.99,45,TRUE,'/images/storage/870evo2tb.png', 4.7),
('Storage','WD Blue SN570 1TB','Western Digital','Value NVMe SSD','{"capacity":"1TB","interface":"PCIe 3.0","read_speed":"3500 MB/s","write_speed":"3000 MB/s","form_factor":"M.2 2280"}',69.99,55,TRUE,'/images/storage/sn5701tb.png', 4.5),
('Storage','Seagate Barracuda 4TB','Seagate','High-capacity HDD','{"capacity":"4TB","interface":"SATA","read_speed":"220 MB/s","write_speed":"220 MB/s","form_factor":"3.5 inch"}',99.99,40,TRUE,'/images/storage/barracuda4tb.png', 4.8),
('Storage','Samsung 980 Pro 1TB','Samsung','High-speed NVMe SSD','{"capacity":"1TB","interface":"PCIe 4.0","read_speed":"7000 MB/s","write_speed":"5000 MB/s","form_factor":"M.2 2280"}',149.99,50,TRUE,'/images/storage/980pro1tb.png', 4.9),
('Storage','Crucial P3 Plus 2TB','Crucial','Affordable NVMe SSD','{"capacity":"2TB","interface":"PCIe 4.0","read_speed":"5000 MB/s","write_speed":"4200 MB/s","form_factor":"M.2 2280"}',99.99,45,TRUE,'/images/storage/p3plus2tb.png', 4.7),
('Storage','WD Black SN770 1TB','Western Digital','High performance NVMe SSD','{"capacity":"1TB","interface":"PCIe 4.0","read_speed":"5150 MB/s","write_speed":"4900 MB/s","form_factor":"M.2 2280"}',109.99,50,TRUE,'/images/storage/sn7701tb.png', 4.5);
