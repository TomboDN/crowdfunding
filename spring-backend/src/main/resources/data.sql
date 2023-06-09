INSERT INTO roles(id, name)
VALUES (1, 'ROLE_USER'),
       (2, 'ROLE_MODERATOR'),
       (3, 'ROLE_ADMIN')
ON CONFLICT DO NOTHING;

INSERT INTO categories(id, name)
VALUES (1, 'Другое'),
       (2, 'Искусство'),
       (3, 'Еда'),
       (4, 'Кино'),
       (5, 'Технологии'),
       (6, 'Путешествия'),
       (7, 'Музыка'),
       (8, 'Мода')
ON CONFLICT DO NOTHING;

INSERT INTO users(id, email, password, username)
VALUES (1, 'system@mail.ru', 'system', 'system')
ON CONFLICT DO NOTHING;

INSERT INTO user_roles(user_id, role_id)
VALUES (1, 3)
ON CONFLICT DO NOTHING;

INSERT INTO campaigns(id, description, end_date, goal_amount, image_url, launch, raised_amount, tagline, title,
                      category_id, user_id)
VALUES (1,
        '"FoodSavior" - это мобильное приложение, которое позволяет сократить количество выбрасываемой еды. Пользователи могут найти рестораны и магазины, которые готовы отдать оставшиеся продукты за символическую цену. Мы собираем средства на доработку приложения и расширение его функционала.',
        '2023-07-20',
        2000000,
        'uploads/1_food.jpg',
        true,
        10000,
        '"FoodSavior" - это мобильное приложение, которое позволяет сократить количество выбрасываемой еды.',
        'FoodSavior',
        5,
        1),
       (2,
        'Краудфандинговая кампания для производства уникальных ледяных кубиков из природных ингредиентов, которые оживят любой напиток. Ледяные кубики производятся из воды, свежевыжатых соков, фруктов и ягод, не содержат консервантов и добавок.',
        '2023-09-10',
        1000000,
        'uploads/2_cubes.jpg',
        true,
        500000,
        'Вкусные и полезные ледяные кубики, которые сделают любой напиток неповторимым.',
        'Свежее дыхание',
        3,
        1),
       (3,
        'Краудфандинговая кампания для создания портативной солнечной батареи, которая будет обеспечивать бесперебойное питание для мобильных устройств, ламп и других приборов на основе энергии солнца.',
        '2023-08-20',
        1200000,
        'uploads/3_energy.jpg',
        true,
        100000,
        'Устройство, которое позволяет получать энергию в любом месте и в любое время.',
        'Безграничная энергия',
        5,
        1),
       (4,
        'Краудфандинговая кампания для создания площадок для вертикального озеленения в городах. Мы хотим создать больше зеленых зон в городах, чтобы снизить уровень загрязнения и улучшить качество жизни горожан.',
        '2023-07-10',
        3000000,
        'uploads/4_green.jpg',
        true,
        2000000,
        'Площадки для вертикального озеленения в городах.',
        'Зеленый город',
        1,
        1)
ON CONFLICT DO NOTHING;

INSERT INTO perks(id, description, price, title, campaign_id)
VALUES (1, 'Получите доступ к бета-версии приложения за $10 и помогите нам улучшить его', 750, 'Помощник', 1),
       (2, 'Получите специальную благодарность в приложении', 1500, 'Спонсор', 1)
        ,
       (3, 'Поддержите нас и станьте нашим официальным партнером', 5000, 'Партнер', 1)
        ,

       (4, 'Набор из 50 ледяных кубиков', 500, 'Помощник', 2)
        ,
       (5, 'Набор из 100 ледяных кубиков', 900, 'Спонсор', 2)
        ,
       (6, 'Набор из 200 ледяных кубиков', 1700, 'Партнер', 2)
        ,

       (7, 'Портативная солнечная батарея на 5000 мАч', 2000, 'Помощник', 3)
        ,
       (8, 'Портативная солнечная батарея на 10000 мАч', 3500, 'Спонсор', 3)
        ,
       (9, 'Портативная солнечная батарея на 20000 мАч', 6500, 'Партнер', 3)
        ,

       (10, 'Пожертвование на 5 квадратных метров озеленения', 5000, 'Помощник', 4)
        ,
       (11, 'Пожертвование на 10 квадратных метров озеленения', 9000, 'Спонсор', 4)
        ,
       (12, 'Пожертвование на 20 квадратных метров озеленения', 17000, 'Партнер', 4)
ON CONFLICT
    DO NOTHING;


CREATE SEQUENCE IF NOT EXISTS users_id_seq
    INCREMENT 1
    START 2
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY users.id;

ALTER SEQUENCE users_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS campaigns_id_seq
    INCREMENT 1
    START 5
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY campaigns.id;

ALTER SEQUENCE campaigns_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS categories_id_seq
    INCREMENT 1
    START 9
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY categories.id;

ALTER SEQUENCE categories_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS contributions_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY contributions.id;

ALTER SEQUENCE contributions_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS perks_id_seq
    INCREMENT 1
    START 13
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1
    OWNED BY perks.id;

ALTER SEQUENCE public.perks_id_seq
    OWNER TO postgres;

CREATE SEQUENCE IF NOT EXISTS roles_id_seq
    INCREMENT 1
    START 4
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY roles.id;

ALTER SEQUENCE roles_id_seq
    OWNER TO postgres;

SELECT setval('users_id_seq', (select count(*) from users), true);
SELECT setval('perks_id_seq', (select count(*) from perks), true);
SELECT setval('campaigns_id_seq', (select count(*) from campaigns), true);
