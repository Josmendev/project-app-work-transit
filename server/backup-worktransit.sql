--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: trip_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trip_status_enum AS ENUM (
    'Pendiente',
    'En progreso',
    'Iniciado',
    'Culminado'
);


ALTER TYPE public.trip_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brand (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "brandId" integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(50) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.brand OWNER TO postgres;

--
-- Name: brand_brandId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."brand_brandId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."brand_brandId_seq" OWNER TO postgres;

--
-- Name: brand_brandId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."brand_brandId_seq" OWNED BY public.brand."brandId";


--
-- Name: connection_point; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.connection_point (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "connectionPointId" integer NOT NULL,
    description character varying(20) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.connection_point OWNER TO postgres;

--
-- Name: connection_point_connectionPointId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."connection_point_connectionPointId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."connection_point_connectionPointId_seq" OWNER TO postgres;

--
-- Name: connection_point_connectionPointId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."connection_point_connectionPointId_seq" OWNED BY public.connection_point."connectionPointId";


--
-- Name: model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "modelId" integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(50) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "brandBrandId" integer
);


ALTER TABLE public.model OWNER TO postgres;

--
-- Name: model_modelId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."model_modelId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."model_modelId_seq" OWNER TO postgres;

--
-- Name: model_modelId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."model_modelId_seq" OWNED BY public.model."modelId";


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "roleId" integer NOT NULL,
    description character varying(20) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_roleId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."role_roleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."role_roleId_seq" OWNER TO postgres;

--
-- Name: role_roleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."role_roleId_seq" OWNED BY public.role."roleId";


--
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route (
    "routeId" integer NOT NULL,
    "routeNumber" character varying(20) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.route OWNER TO postgres;

--
-- Name: route_has_connection_point; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route_has_connection_point (
    "routeHasConnectionPointId" integer NOT NULL,
    "routeRouteId" integer,
    "connectionPointConnectionPointId" integer,
    "stopStopId" integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.route_has_connection_point OWNER TO postgres;

--
-- Name: route_has_connection_point_routeHasConnectionPointId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."route_has_connection_point_routeHasConnectionPointId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."route_has_connection_point_routeHasConnectionPointId_seq" OWNER TO postgres;

--
-- Name: route_has_connection_point_routeHasConnectionPointId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."route_has_connection_point_routeHasConnectionPointId_seq" OWNED BY public.route_has_connection_point."routeHasConnectionPointId";


--
-- Name: route_routeId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."route_routeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."route_routeId_seq" OWNER TO postgres;

--
-- Name: route_routeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."route_routeId_seq" OWNED BY public.route."routeId";


--
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "staffId" integer NOT NULL,
    "identityDocumentNumber" character varying(8) NOT NULL,
    name character varying(30) NOT NULL,
    "paternalSurname" character varying(15) NOT NULL,
    "maternalSurname" character varying(15) NOT NULL,
    telephone character varying(12) NOT NULL,
    email character varying(25) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- Name: staff_staffId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."staff_staffId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."staff_staffId_seq" OWNER TO postgres;

--
-- Name: staff_staffId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."staff_staffId_seq" OWNED BY public.staff."staffId";


--
-- Name: stop; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stop (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "stopId" integer NOT NULL,
    description character varying(20) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "zoneZoneId" integer
);


ALTER TABLE public.stop OWNER TO postgres;

--
-- Name: stop_stopId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."stop_stopId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."stop_stopId_seq" OWNER TO postgres;

--
-- Name: stop_stopId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."stop_stopId_seq" OWNED BY public.stop."stopId";


--
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "tripId" integer NOT NULL,
    "tripNum" character varying(50) NOT NULL,
    "finalCapacity" integer NOT NULL,
    "estimatedTimeOfArrival" timestamp without time zone NOT NULL,
    "arrivalTime" timestamp without time zone,
    "departureTime" timestamp without time zone,
    "completionTime" timestamp without time zone,
    "routeRouteId" integer,
    "vehicleVehicleId" integer,
    status public.trip_status_enum DEFAULT 'Pendiente'::public.trip_status_enum NOT NULL,
    "qrCode" character varying(300)
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- Name: trip_has_passengers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_has_passengers (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "tripHasPassengerId" integer NOT NULL,
    "tripTripId" integer,
    "staffStaffId" integer
);


ALTER TABLE public.trip_has_passengers OWNER TO postgres;

--
-- Name: trip_has_passengers_tripHasPassengerId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."trip_has_passengers_tripHasPassengerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."trip_has_passengers_tripHasPassengerId_seq" OWNER TO postgres;

--
-- Name: trip_has_passengers_tripHasPassengerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."trip_has_passengers_tripHasPassengerId_seq" OWNED BY public.trip_has_passengers."tripHasPassengerId";


--
-- Name: trip_tripId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."trip_tripId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."trip_tripId_seq" OWNER TO postgres;

--
-- Name: trip_tripId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."trip_tripId_seq" OWNED BY public.trip."tripId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer NOT NULL,
    username character varying(15) NOT NULL,
    password character varying(62) NOT NULL,
    "isConfirm" boolean DEFAULT false NOT NULL,
    token character varying(62),
    "expiresAt" timestamp without time zone,
    photo character varying(50),
    "isActive" boolean DEFAULT true NOT NULL,
    "staffId" integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_has_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_has_roles (
    "userHasRolesId" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer,
    "roleId" integer
);


ALTER TABLE public.user_has_roles OWNER TO postgres;

--
-- Name: user_has_roles_userHasRolesId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."user_has_roles_userHasRolesId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."user_has_roles_userHasRolesId_seq" OWNER TO postgres;

--
-- Name: user_has_roles_userHasRolesId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."user_has_roles_userHasRolesId_seq" OWNED BY public.user_has_roles."userHasRolesId";


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."user_userId_seq" OWNER TO postgres;

--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "vehicleId" integer NOT NULL,
    "licensePlateNumber" character varying(15) NOT NULL,
    capacity integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "modelModelId" integer
);


ALTER TABLE public.vehicle OWNER TO postgres;

--
-- Name: vehicle_vehicleId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."vehicle_vehicleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."vehicle_vehicleId_seq" OWNER TO postgres;

--
-- Name: vehicle_vehicleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."vehicle_vehicleId_seq" OWNED BY public.vehicle."vehicleId";


--
-- Name: zone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zone (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "zoneId" integer NOT NULL,
    description character varying(20) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.zone OWNER TO postgres;

--
-- Name: zone_zoneId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."zone_zoneId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."zone_zoneId_seq" OWNER TO postgres;

--
-- Name: zone_zoneId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."zone_zoneId_seq" OWNED BY public.zone."zoneId";


--
-- Name: brand brandId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand ALTER COLUMN "brandId" SET DEFAULT nextval('public."brand_brandId_seq"'::regclass);


--
-- Name: connection_point connectionPointId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connection_point ALTER COLUMN "connectionPointId" SET DEFAULT nextval('public."connection_point_connectionPointId_seq"'::regclass);


--
-- Name: model modelId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model ALTER COLUMN "modelId" SET DEFAULT nextval('public."model_modelId_seq"'::regclass);


--
-- Name: role roleId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN "roleId" SET DEFAULT nextval('public."role_roleId_seq"'::regclass);


--
-- Name: route routeId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route ALTER COLUMN "routeId" SET DEFAULT nextval('public."route_routeId_seq"'::regclass);


--
-- Name: route_has_connection_point routeHasConnectionPointId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_has_connection_point ALTER COLUMN "routeHasConnectionPointId" SET DEFAULT nextval('public."route_has_connection_point_routeHasConnectionPointId_seq"'::regclass);


--
-- Name: staff staffId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff ALTER COLUMN "staffId" SET DEFAULT nextval('public."staff_staffId_seq"'::regclass);


--
-- Name: stop stopId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stop ALTER COLUMN "stopId" SET DEFAULT nextval('public."stop_stopId_seq"'::regclass);


--
-- Name: trip tripId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip ALTER COLUMN "tripId" SET DEFAULT nextval('public."trip_tripId_seq"'::regclass);


--
-- Name: trip_has_passengers tripHasPassengerId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_has_passengers ALTER COLUMN "tripHasPassengerId" SET DEFAULT nextval('public."trip_has_passengers_tripHasPassengerId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Name: user_has_roles userHasRolesId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_roles ALTER COLUMN "userHasRolesId" SET DEFAULT nextval('public."user_has_roles_userHasRolesId_seq"'::regclass);


--
-- Name: vehicle vehicleId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle ALTER COLUMN "vehicleId" SET DEFAULT nextval('public."vehicle_vehicleId_seq"'::regclass);


--
-- Name: zone zoneId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone ALTER COLUMN "zoneId" SET DEFAULT nextval('public."zone_zoneId_seq"'::regclass);


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brand (created_at, updated_at, "brandId", name, description, "isActive") FROM stdin;
\.


--
-- Data for Name: connection_point; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.connection_point (created_at, updated_at, "connectionPointId", description, "isActive") FROM stdin;
\.


--
-- Data for Name: model; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.model (created_at, updated_at, "modelId", name, description, "isActive", "brandBrandId") FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (created_at, updated_at, "roleId", description, "isActive") FROM stdin;
2025-07-26 10:31:45.033537	2025-07-26 10:31:45.033537	1	Pasajero	t
\.


--
-- Data for Name: route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route ("routeId", "routeNumber", "isActive", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: route_has_connection_point; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route_has_connection_point ("routeHasConnectionPointId", "routeRouteId", "connectionPointConnectionPointId", "stopStopId", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff (created_at, updated_at, "staffId", "identityDocumentNumber", name, "paternalSurname", "maternalSurname", telephone, email, "isActive") FROM stdin;
2025-07-26 10:31:07.610095	2025-07-26 10:31:07.610095	1	70125834	Jose	Menacho	Minchola	984004404	josmendev@gmail.com	t
\.


--
-- Data for Name: stop; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stop (created_at, updated_at, "stopId", description, "isActive", "zoneZoneId") FROM stdin;
\.


--
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip (created_at, updated_at, "tripId", "tripNum", "finalCapacity", "estimatedTimeOfArrival", "arrivalTime", "departureTime", "completionTime", "routeRouteId", "vehicleVehicleId", status, "qrCode") FROM stdin;
\.


--
-- Data for Name: trip_has_passengers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_has_passengers (created_at, updated_at, "tripHasPassengerId", "tripTripId", "staffStaffId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (created_at, updated_at, "userId", username, password, "isConfirm", token, "expiresAt", photo, "isActive", "staffId") FROM stdin;
2025-07-26 10:32:54.546549	2025-07-26 11:54:48.380009	1	70125834	$2b$10$fL4H46q6SML0RGPN/XW1o.LK530XNxk6/oRPt/QThnWLYRnpX9RrS	t	$2b$10$f/F6/stAI4ZfjOC4dy6kJ.1VnjungkqdLpoUAft9pH/CPgVO2iCYm	2025-07-26 06:54:53.136	\N	t	1
\.


--
-- Data for Name: user_has_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_has_roles ("userHasRolesId", created_at, updated_at, "userId", "roleId") FROM stdin;
1	2025-07-26 10:34:49.590922	2025-07-26 10:34:49.590922	1	1
\.


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle (created_at, updated_at, "vehicleId", "licensePlateNumber", capacity, "isActive", "modelModelId") FROM stdin;
\.


--
-- Data for Name: zone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zone (created_at, updated_at, "zoneId", description, "isActive") FROM stdin;
\.


--
-- Name: brand_brandId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."brand_brandId_seq"', 1, false);


--
-- Name: connection_point_connectionPointId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."connection_point_connectionPointId_seq"', 1, false);


--
-- Name: model_modelId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."model_modelId_seq"', 1, false);


--
-- Name: role_roleId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."role_roleId_seq"', 1, false);


--
-- Name: route_has_connection_point_routeHasConnectionPointId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."route_has_connection_point_routeHasConnectionPointId_seq"', 1, false);


--
-- Name: route_routeId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."route_routeId_seq"', 1, false);


--
-- Name: staff_staffId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."staff_staffId_seq"', 1, false);


--
-- Name: stop_stopId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."stop_stopId_seq"', 1, false);


--
-- Name: trip_has_passengers_tripHasPassengerId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."trip_has_passengers_tripHasPassengerId_seq"', 1, false);


--
-- Name: trip_tripId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."trip_tripId_seq"', 1, false);


--
-- Name: user_has_roles_userHasRolesId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_has_roles_userHasRolesId_seq"', 1, false);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_userId_seq"', 1, false);


--
-- Name: vehicle_vehicleId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."vehicle_vehicleId_seq"', 1, false);


--
-- Name: zone_zoneId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."zone_zoneId_seq"', 1, false);


--
-- Name: model PK_04be398d619478c52d83b33ff4f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT "PK_04be398d619478c52d83b33ff4f" PRIMARY KEY ("modelId");


--
-- Name: brand PK_06ca7cdcefa81b3640aab592a63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "PK_06ca7cdcefa81b3640aab592a63" PRIMARY KEY ("brandId");


--
-- Name: connection_point PK_0d5484a072deeb5d583e4a94551; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connection_point
    ADD CONSTRAINT "PK_0d5484a072deeb5d583e4a94551" PRIMARY KEY ("connectionPointId");


--
-- Name: route_has_connection_point PK_2cf83d0b05b0d637c574501b802; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_has_connection_point
    ADD CONSTRAINT "PK_2cf83d0b05b0d637c574501b802" PRIMARY KEY ("routeHasConnectionPointId");


--
-- Name: user_has_roles PK_4a24df6b6a73d5a14ec7da1a0a9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_roles
    ADD CONSTRAINT "PK_4a24df6b6a73d5a14ec7da1a0a9" PRIMARY KEY ("userHasRolesId");


--
-- Name: trip PK_5f96ba26c177c66805bc1b03654; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "PK_5f96ba26c177c66805bc1b03654" PRIMARY KEY ("tripId");


--
-- Name: role PK_703705ba862c2bb45250962c9e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId");


--
-- Name: zone PK_7d38fefa126083af44fad9df2fc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zone
    ADD CONSTRAINT "PK_7d38fefa126083af44fad9df2fc" PRIMARY KEY ("zoneId");


--
-- Name: staff PK_a455629d6ffbd1f2953f453f3f9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT "PK_a455629d6ffbd1f2953f453f3f9" PRIMARY KEY ("staffId");


--
-- Name: vehicle PK_b5be432491dba475c68b244d471; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT "PK_b5be432491dba475c68b244d471" PRIMARY KEY ("vehicleId");


--
-- Name: user PK_d72ea127f30e21753c9e229891e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId");


--
-- Name: route PK_ddeecfd91aa8b96fa1cc9b3cba9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT "PK_ddeecfd91aa8b96fa1cc9b3cba9" PRIMARY KEY ("routeId");


--
-- Name: stop PK_de0d4212cedc4eab084e379bbde; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stop
    ADD CONSTRAINT "PK_de0d4212cedc4eab084e379bbde" PRIMARY KEY ("stopId");


--
-- Name: trip_has_passengers PK_eaf34ffba08667693e02f3137c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_has_passengers
    ADD CONSTRAINT "PK_eaf34ffba08667693e02f3137c9" PRIMARY KEY ("tripHasPassengerId");


--
-- Name: vehicle UQ_849e0cc4d98a094f3b21a015785; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT "UQ_849e0cc4d98a094f3b21a015785" UNIQUE ("licensePlateNumber");


--
-- Name: route UQ_f1ecfaee7fb49933cfb8157a063; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT "UQ_f1ecfaee7fb49933cfb8157a063" UNIQUE ("routeNumber");


--
-- Name: staff UQ_f34a2d2079df47e825c42bd01e6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT "UQ_f34a2d2079df47e825c42bd01e6" UNIQUE ("identityDocumentNumber");


--
-- Name: route_has_connection_point FK_01bad9242af571794194f54fddc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_has_connection_point
    ADD CONSTRAINT "FK_01bad9242af571794194f54fddc" FOREIGN KEY ("routeRouteId") REFERENCES public.route("routeId");


--
-- Name: route_has_connection_point FK_0e46becad8c720829c43f3578df; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_has_connection_point
    ADD CONSTRAINT "FK_0e46becad8c720829c43f3578df" FOREIGN KEY ("connectionPointConnectionPointId") REFERENCES public.connection_point("connectionPointId");


--
-- Name: trip_has_passengers FK_1094cb4ba043b53a093bd49f1bf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_has_passengers
    ADD CONSTRAINT "FK_1094cb4ba043b53a093bd49f1bf" FOREIGN KEY ("staffStaffId") REFERENCES public.staff("staffId");


--
-- Name: user_has_roles FK_1337dbe1a4233b5c4b482f981ea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_roles
    ADD CONSTRAINT "FK_1337dbe1a4233b5c4b482f981ea" FOREIGN KEY ("roleId") REFERENCES public.role("roleId");


--
-- Name: route_has_connection_point FK_35713e9cf9119545a06f649078c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_has_connection_point
    ADD CONSTRAINT "FK_35713e9cf9119545a06f649078c" FOREIGN KEY ("stopStopId") REFERENCES public.stop("stopId");


--
-- Name: user_has_roles FK_3fd6d8f71742f27803b47027368; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_has_roles
    ADD CONSTRAINT "FK_3fd6d8f71742f27803b47027368" FOREIGN KEY ("userId") REFERENCES public."user"("userId");


--
-- Name: trip FK_6c59d04eef7fda34af6fc48172a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "FK_6c59d04eef7fda34af6fc48172a" FOREIGN KEY ("vehicleVehicleId") REFERENCES public.vehicle("vehicleId");


--
-- Name: user FK_8f18060284824a8516b6bc325f1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_8f18060284824a8516b6bc325f1" FOREIGN KEY ("staffId") REFERENCES public.staff("staffId");


--
-- Name: trip FK_92384d522233c7997f6e2f5b4db; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "FK_92384d522233c7997f6e2f5b4db" FOREIGN KEY ("routeRouteId") REFERENCES public.route("routeId");


--
-- Name: vehicle FK_ab19894bc8bc2dcffe4ab594f31; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT "FK_ab19894bc8bc2dcffe4ab594f31" FOREIGN KEY ("modelModelId") REFERENCES public.model("modelId");


--
-- Name: stop FK_b0bd38a2bfd38b59723b612991d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stop
    ADD CONSTRAINT "FK_b0bd38a2bfd38b59723b612991d" FOREIGN KEY ("zoneZoneId") REFERENCES public.zone("zoneId");


--
-- Name: trip_has_passengers FK_e214dbcc88c691c009d878ebfa8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_has_passengers
    ADD CONSTRAINT "FK_e214dbcc88c691c009d878ebfa8" FOREIGN KEY ("tripTripId") REFERENCES public.trip("tripId");


--
-- Name: model FK_ed6d6929dd961858bf48c872360; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT "FK_ed6d6929dd961858bf48c872360" FOREIGN KEY ("brandBrandId") REFERENCES public.brand("brandId");


--
-- PostgreSQL database dump complete
--

