DROP TABLE IF EXISTS TB_HEROES;
CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    POWER TEXT NOT NULL
)
--será a função create
INSERT INTO TB_HEROES (NAME, POWER)
VALUES
    ("Kurosaki Ichigo", "Shinigami"),
    ("Yuna", "Summoner")

--será a função read
SELECT * FROM TB_HEROES;
SELECT * FROM TB_HEROES WHERE NAME = 'YUNA';

--será a função update
UPDATE TB_HEROES
SET NOME = "Okumura Rin", POWER = "Exorcista"
WHERE ID = 1

--será a função delete
DELETE FROM TB_HEROES WHERE ID = 1
