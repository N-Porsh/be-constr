begin;

insert into "user" (role, name, email, password)
values ('SUPER_ADMIN', 'admin', 'admin@mapri.eu', '$2y$12$BgKzi2grUz/E7MfNo2Q8S.Ay7Qnhu1VFrrHRUKB1Q5tdK/XsouxXe'),
       ('INSPECTOR', 'Tambet Aru', 'tambet@mapri.eu', ''),
       ('INSPECTOR', 'Janar Grauberg', 'janar@mapri.eu', ''),
       ('INSPECTOR', 'Indrek Haldma', 'indrek.haldma@mapri.eu', ''),
       ('INSPECTOR', 'Angelina Hartševa', 'angelina.hartseva@mapri.eu', ''),
       ('INSPECTOR', 'Karry Jallai', 'karry@mapri.eu', ''),
       ('INSPECTOR', 'Jaan Jänes', 'jaan@mapri.eu', ''),
       ('INSPECTOR', 'Madis Järvpõld', 'madis@mapri.eu', ''),
       ('INSPECTOR', 'Martin Kabral', 'martin.kabral@mapri.eu', ''),
       ('INSPECTOR', 'Ken Karja', 'ken@mapri.eu', ''),
       ('INSPECTOR', 'Daniil Khaustov', 'daniil@mapri.eu', ''),
       ('INSPECTOR', 'Anita Kimber', 'anita@mapri.eu', ''),
       ('INSPECTOR', 'Marko Kirso', 'marko.kirso@mapri.eu', ''),
       ('INSPECTOR', 'Kristo Kuusk', 'kristo.kuusk@mapri.eu', ''),
       ('INSPECTOR', 'Annegrete Külaots', 'annegrete@mapri.eu', ''),
       ('INSPECTOR', 'Sigrid Luiga', 'sigrid@mapri.eu', ''),
       ('INSPECTOR', 'Maikko Lõhmus', 'maikko@mapri.eu', ''),
       ('INSPECTOR', 'Anti Mihkelson', 'anti@mapri.eu', ''),
       ('INSPECTOR', 'Artur Minjakov', 'artur@mapri.eu', ''),
       ('INSPECTOR', 'Liis Nemvalts', 'liis@mapri.eu', ''),
       ('INSPECTOR', 'Siim Nurmeots', 'siim.nurmeots@mapri.eu', ''),
       ('INSPECTOR', 'Joosep Nõupuu', 'joosep.noupuu@mapri.eu', ''),
       ('INSPECTOR', 'Laura Olonen', 'laura@mapri.eu', ''),
       ('INSPECTOR', 'Heldur Orav', 'heldur@mapri.eu', ''),
       ('INSPECTOR', 'Priit Paulus', 'priit.paulus@mapri.eu', ''),
       ('INSPECTOR', 'Martin Pezonen', 'martin.pezonen@mapri.eu', ''),
       ('INSPECTOR', 'Hubert Piikov', 'hubert.piikov@mapri.eu', ''),
       ('INSPECTOR', 'Dmitry Pinezhko', 'dmitry@mapri.eu', ''),
       ('INSPECTOR', 'Urmet Puusta', 'urmet@mapri.eu', ''),
       ('INSPECTOR', 'Indrek Põhjatu', 'indrek.pohjatu@mapri.eu', ''),
       ('INSPECTOR', 'Marek Raat', 'marek@mapri.eu', ''),
       ('INSPECTOR', 'Madis Reinloo', 'madis.reinloo@mapri.eu', ''),
       ('INSPECTOR', 'Ronald Rotenberg', 'ronald@mapri.eu', ''),
       ('INSPECTOR', 'Joosep Russak', 'joosep.russak@mapri.eu', ''),
       ('INSPECTOR', 'Roger Rööpson', 'roger@mapri.eu', ''),
       ('INSPECTOR', 'Silver Erik Saage', 'silver@mapri.eu', ''),
       ('INSPECTOR', 'Raigo Saar', 'raigo@mapri.eu', ''),
       ('INSPECTOR', 'Reimu Saaremaa', 'reimu@mapri.eu', ''),
       ('INSPECTOR', 'Martin Sutter', 'martin.sutter@mapri.eu', ''),
       ('INSPECTOR', 'Mait Talu', 'mait.talu@mapri.eu', ''),
       ('INSPECTOR', 'Holger Talvik', 'holger@mapri.eu', ''),
       ('INSPECTOR', 'Rivo Teppo', 'rivo@mapri.eu', ''),
       ('INSPECTOR', 'Madis Timmi', 'madis.timmi@mapri.eu', ''),
       ('INSPECTOR', 'Thorny Valk', 'thorny@mapri.eu', ''),
       ('INSPECTOR', 'Siim Vanaküla', 'siim.vanakyla@mapri.eu', ''),
       ('INSPECTOR', 'Rebeka Solveig Veltson', 'rebeka@mapri.eu', ''),
       ('INSPECTOR', 'Marno Vikat', 'marno.vikat@mapri.eu', ''),
       ('INSPECTOR', 'Siim Villako', 'siim@mapri.eu', '');

insert into object (name, location, active, last_inspection_date)
values ('20-012 L.Weiss teenindushoone', '', true, null),
       ('20-009 Aluoja laohoone', '', true, null),
       ('20-008 Palupera-Agro lüpsilaut', '', true, null),
       ('20-007 AgroAit töökoda', '', true, null),
       ('20-006 JVS töökoda', '', true, null),
       ('20-005 Ahja varjualune ja separeerimishoone', '', true, null),
       ('20-003 Kesa Agro töökoda', '', true, null),
       ('20-002 LIDL Narva', '', true, null),
       ('20-001 Värska sanatoorium', '', true, null),
       ('19-068 Langerma kinnisloomalaut', '', true, null),
       ('19-066 Adavere vasikalaut', '', true, null),
       ('19-065 Tori saetööstus', '', true, null),
       ('19-064 Elvarem tootmishoone', '', true, null),
       ('19-062 Lai 15 korterelamu', '', true, null),
       ('19-061 Estover laohoone', '', true, null),
       ('19-060 Nurmetu tahkesõnnikuhoidla', '', true, null),
       ('19-059 Põltsamaa turisimiinfopunkt', '', true, null),
       ('19-058 Lihula alajaama renoveerimine', '', true, null),
       ('19-057 Melker töökoda', '', true, null),
       ('19-056 Dimediumi laiendus', '', true, null),
       ('19-055 Aruküla Olerex', '', true, null),
       ('19-054 Suure-Jaani Alajaam', '', true, null),
       ('19-053 Forklift OÜ', '', true, null),
       ('19-051 A.Haava korterelamu', '', true, null),
       ('19-050 Estover biogaasijaam', '', true, null),
       ('19-048 Pandivere teraviljakompleks', '', true, null),
       ('19-046 Baltic Steelarc tootmishoone', '', true, null),
       ('19-045 LIDLi pood', '', true, null),
       ('19-044 Raadiraja korterelamud 2. etapp', '', true, null),
       ('19-043 Veldi tee 5 stockoffice', '', true, null),
       ('19-041 Volvo Truck teeninduskeskus', '', true, null),
       ('19-040 Forevi poegimislaut', '', true, null),
       ('19-039 Mass laohoone', '', true, null),
       ('19-038 Piistaoja laudakompleks', '', true, null),
       ('19-036 Kulinaaria tootmishoone', '', true, null),
       ('19-029 Väimela robotlaut', '', true, null),
       ('19-026 Vooremaa kuivati betoonitööd', '', true, null),
       ('19-016 Sillamäe turuhoone', '', true, null),
       ('19-012 ACE logistikakeskus', '', true, null),
       ('19-010 Võru tn 176 Olerex tankla', '', true, null),
       ('19-008 Vintselle lao- ja tootmishoone', '', true, null),
       ('19-005 Raadiraja krte 1.et', '', true, null),
       ('19-004 Jahu 4 ja SP 13', '', true, null),
       ('18-046 Pikk 16 korterelamu', '', true, null);

-- insert into report (object_id, user_id, status, modified_date)
-- values (1, 1, 'DRAFT', now() - INTERVAL '1 day'),
--        (2, 2, 'SUBMITTED', now() - INTERVAL '2 day');

insert into observation_type (name, description)
values ('TO dokumentatsioon',
        'TO plaani, ehitusplatsi skeemi, keskkonnakava, tellingute kasutusjuhendi olemasolu ja asjakohasus. Töövõtjate juhendamise vastavus kokkulepetele ja ehituspäevikule. Töövõtjate tunnistuste/pädevuste, kasutavate kukkumiskaitsevahendite passide olemasolu ja kehtivus, püstitavate töövahendite püstitus- ja kontrollaktide olemasolu, ohtlike kemikaalide arvestuse pidamine.'),
       ('Hädaolukordade valmidus',
        'Esmaabivahendite, silmaduši ja tulekustutusvahendite olemasolu ja kehtivus, soojakus vastava märgistuse olemasolu, objekti vastutajate info olemasolu.'),
       ('Tellingud, redelid',
        'Vastavus kasutusjuhendile, kaugus seinast (max 250mm), paigaldus 1m üle toetuspunkti või kinnitatuna, seisukord (deformeerunud/puudu olevad osad), aluspind (tasandatud ja tambitud).'),
       ('Elekter, valgustus',
        'Sisselõigete ja parandusteta elektrijuhtmed, ajutiste elektrijuhtmete paiknemine, sõiduteel asetsevate kaablite kaitsmine, objekti valgustus (min 25lx), valgustite komplektsus (kaitseklaasid, kaitsevõrud).'),
       ('Kaitse kukkumiste ja varingute vastu',
        'Äärepiirete olemasolu ja vastavus, põranda ja katuste avade katmine, kukkumiskaitse varustus, tõsteala piiramine, tõste- ja kaevetööde tehnoloogiline korrektsus.'),
       ('IKV ja ÜKV, ohumärgistus',
        'Kiivrid, vestid/kõrgnähtavad tööjoped, turvajalanõud, põlvekaitsmed, kõrvaklapid, respiraatorid, väravasildid, ohualade tähistus.'),
       ('Objekti käiguteed ja heakord',
        'Jäätmekäitluse korrektsus, tolm, materjalide ladustuse vastavus skeemile, suuremõõtmeliste detailide toestus, keskkonnaohtlike materjalide korrektne ladustamine, käiguteede puhtus, treppide/kaldteede kohtkindel kinnitus, libeduse tõrje, üldine objekti ja soojakute heakord, seadusele vastav WC’de, duššide, riietusruumide ning toidu säilitamis- ja soojendamisvõimaluste olemasolu.');


-- insert into observation (report_id, observation_type_id, correct_count)
-- values (1, 3, 4);

insert into responsible_person (name, email)
values ('Mark the Strongest', 'strongest@gmail.com');


-- insert into defect (observation_id, responsible_person_id, resolved, deadline, description)
-- values (1, 1, false, now() + INTERVAL '9 day', 'Such a terrible defect, I have no words'),
--        (1, 1, true, now() + INTERVAL '4 day', 'This one is even worse');

-- insert into attachment (defect_id, path)
-- values (1, '/storage/images/def1.jpg'),
--        (1, '/storage/images/def12.jpg'),
--        (2, '/storage/images/def123.jpg');

commit;