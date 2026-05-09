import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import CompassWrap from './CompassWrap';
import { PROGRAMS } from '../constants/programs';
// ================= ICONS =================

const electricIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTM2IDEyTDIwIDM2aDEybC00IDE2IDIwLTI4SDM2bDQtMTJ6IiBzdHJva2U9IiNjMjQxMTAiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';

const wrenchIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTQxIDEybDExIDExLTkgOSA1IDUtOSA5LTUtNS05IDktMTEtMTEgOS05LTUtNSA5LTkgNSA1IDktOXoiIHN0cm9rZT0iIzdiMzQxZSIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==';

const gearIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTAiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48cGF0aCBkPSJNMzIgMTJ2OE0zMiA0NHY4TTEyIDMyaDhNNDQgMzJoOE0xOCAxOGw2IDZNNDAgNDBsNiA2TTE4IDQ2bDYtNk00MCAyNGw2LTYiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==';

const toolsIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE4IDE4bDI4IDI4TTQ2IDE4TDE4IDQ2IiBzdHJva2U9IiM2YjQ2YzEiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

const antennaIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTMyIDE2djMyTTI0IDQ4aDE2TTIyIDI2YzYtNiAxNC02IDIwIDBNMTggMjJjOC04IDIwLTggMjggMCIgc3Ryb2tlPSIjMGY3NjY5IiBzdHJva2Utd2lkdGg9IjMuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+';

const snowIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTMyIDEydjQwTTEyIDMyaDQwTTE5IDE5bDI2IDI2TTE5IDQ1bDI2LTI2IiBzdHJva2U9IiNkNjMzODQiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

const monitorIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iNDQiIGhlaWdodD0iMzAiIHJ4PSI0IiBzdHJva2U9IiM5YTY3MDAiIHN0cm9rZS13aWR0aD0iMy41Ii8+PHBhdGggZD0iTTI0IDUySDQwIiBzdHJva2U9IiM5YTY3MDAiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

const rulerIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI0IiBzdHJva2U9IiMyZjg1NTUiIHN0cm9rZS13aWR0aD0iMy41Ii8+PHBhdGggZD0iTTI0IDI0djhNMzIgMjR2NE00MCAyNHY4IiBzdHJva2U9IiMyZjg1NTUiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==';

const solarIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iOCIgc3Ryb2tlPSIjMmY4NTU1IiBzdHJva2Utd2lkdGg9IjMuNSIvPjxwYXRoIGQ9Ik0zMiA4djZNMzIgMzR2Nk0xNiAyNGg2TTQyIDI0aDZNMjEgMTNsNCA0TTM5IDM1bDQgNE0yMSAzNWw0LTRNMzkgMTdsNCA0IiBzdHJva2U9IiMyZjg1NTUiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==';

const globeIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjAiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48cGF0aCBkPSJNMTIgMzJoNDBNMzIgMTJjNiA2IDYgMzQgMCA0MGMtNi02LTYtMzQgMC00MHoiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+';

const shieldIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTMyIDEybDE2IDZ2MTJjMCAxMi04IDE4LTE2IDIyLTgtNC0xNi0xMC0xNi0yMlYxOHoiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';

const homeIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDMwTDMyIDE0bDIwIDE2djIwSDEyVjMweiIgc3Ryb2tlPSIjYjQyMzE4IiBzdHJva2Utd2lkdGg9IjMuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==';

const busIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iMzIiIGhlaWdodD0iMjQiIHJ4PSI0IiBzdHJva2U9IiNkNjMzODQiIHN0cm9rZS13aWR0aD0iMy41Ii8+PGNpcmNsZSBjeD0iMjQiIGN5PSI0NiIgcj0iMyIgZmlsbD0iI2Q2MzM4NCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDYiIHI9IjMiIGZpbGw9IiNkNjMzODQiLz48L3N2Zz4=';

const truckIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE0IDI0aDI4djE2SDE0ek00MiAzMGgxMGw2IDh2Mkg0MiIgc3Ryb2tlPSIjYzI0MTEwIiBzdHJva2Utd2lkdGg9IjMuNSIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iNDYiIHI9IjMiIGZpbGw9IiNjMjQxMTAiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjQ2IiByPSIzIiBmaWxsPSIjYzI0MTEwIi8+PC9zdmc+';

const craneIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE2IDUyVjE2aDIwTTM2IDE2bDEyIDEyTTQ4IDI4djIwTTQ0IDQ4aDgiIHN0cm9rZT0iIzFiNGE3MCIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==';

const fashionIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTI0IDE2bDgtNCA4IDR2MzJsLTggNC04LTR6IiBzdHJva2U9IiM5YTY3MDAiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';

const laptopIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMTYiIHk9IjE4IiB3aWR0aD0iMzIiIGhlaWdodD0iMjAiIHJ4PSIzIiBzdHJva2U9IiNiNDIzMTgiIHN0cm9rZS13aWR0aD0iMy41Ii8+PHBhdGggZD0iTTEyIDQ2aDQwIiBzdHJva2U9IiNiNDIzMTgiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

const paletteIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTYiIHN0cm9rZT0iIzZiNDZjMSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48Y2lyY2xlIGN4PSIyNiIgY3k9IjI2IiByPSIyIiBmaWxsPSIjNmI0NmMxIi8+PGNpcmNsZSBjeD0iMzgiIGN5PSIyNiIgcj0iMiIgZmlsbD0iIzZiNDZjMSIvPjxjaXJjbGUgY3g9IjI2IiBjeT0iMzgiIHI9IjIiIGZpbGw9IiM2YjQ2YzEiLz48L3N2Zz4=';

const frontendIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iNDQiIGhlaWdodD0iMzYiIHJ4PSI0IiBzdHJva2U9IiM3YjM0MWUiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0yNCAyNmwtNiA2IDYgNiIgc3Ryb2tlPSIjN2IzNDFlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00MCAyNmw2IDYtNiA2IiBzdHJva2U9IiM3YjM0MWUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';

const databaseIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGVsbGlwc2UgY3g9IjMyIiBjeT0iMTgiIHJ4PSIxNCIgcnk9IjYiIHN0cm9rZT0iIzA4OTFhNiIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48cGF0aCBkPSJNMTggMTh2MjBjMCAzIDYgNiAxNCA2czE0LTMgMTQtNlYxOCIgc3Ryb2tlPSIjMDg5MWE2IiBzdHJva2Utd2lkdGg9IjMuNSIvPjwvc3ZnPg==';

const mobileIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iMjIiIHk9IjEyIiB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIHJ4PSI0IiBzdHJva2U9IiMwZjc2NjkiIHN0cm9rZS13aWR0aD0iMy41Ii8+PGNpcmNsZSBjeD0iMzIiIGN5PSI0NCIgcj0iMiIgZmlsbD0iIzBmNzY2OSIvPjwvc3ZnPg==';
const targetIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTgiIHN0cm9rZT0iIzExMTExMSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIxMiIgc3Ryb2tlPSIjMTExMTExIiBzdHJva2Utd2lkdGg9IjMuNSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjYiIHN0cm9rZT0iIzExMTExMSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyLjUiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=';
const checkIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE4IDMybDkgOSAxOS0xOSIgc3Ryb2tlPSIjMmY4NTU1IiBzdHJva2Utd2lkdGg9IjQuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';
// FIRE ICON
const fireIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTM2IDE0YzIgOCAxMiAxMCAxMiAyMmMwIDEwLTggMTgtMTggMThTMTIgNDYgMTIgMzZjMC04IDYtMTQgMTItMjBjMCA2IDQgMTAgOCAxNnoiIHN0cm9rZT0iIzExMTExMSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMzIgMzBjMSA0IDYgNiA2IDEyYTggOCAwIDEtMS0xNiAwYzAtNCAzLTMgNi04eiIgc3Ryb2tlPSIjMTExMTExIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==';
// SETTINGS ICON — same clean line style as checkIcon/fireIcon
const settingsIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTMyIDIyYTkgOSAwIDEgMCAwIDE4IDkgOSAwIDAgMCAwLTE4Wk0zMiAxNGwzIDUgNi0xIDIgNiA1IDMtNSA0IDEgNi02IDItMyA1LTMtNS02IDEtMi02LTUtMyA1LTQtMS02IDYtMi0zLTVaIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';


// CAR ICON — same website style
const carIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE2IDM4bDQtMTBoMjR sNCAxMCAyIDhIMTR6IiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0IDM4aDE2IiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iMjIiIGN5PSI0OCIgcj0iMyIgZmlsbD0iIzExMTExMSIvPjxjaXJjbGUgY3g9IjQyIiBjeT0iNDgiIHI9IjMiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4=';
  const CARDS_DATA = [
  // Column 1
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني ميكاترونكس',
    description: 'يشغّل ويصون الأنظمة الصناعية الذكية',
    icon: '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',
    iconClass: 'ic-orange',
  },
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني أتمتة',
    description: 'يبرمج ويشرف على أنظمة التحكم الآلي',
    icon:  settingsIcon,
    iconClass: 'ic-blue',
  },
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني صيانة متقدمة',
    description: 'يتشخص الأعطال ويصون الأنظمة المعقدة',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO2YPU7DQBCFHwWCDk4RbkBNwY8UwQFyAsIJEBeAE0CRAxCFC0AXCUp6qIDG6aChwxKzaKURSjZ21vFKzgvMJ71mZtf7nr2yrQUMw5iXIwAZAEeqDMBhlSAjArMuIu8xyreKFVFFsSANIRaEDLEgZIgFIUMsCBliQcgQC0KGWBAyxIKQIRaEDLEgZIgFWdYgLwQniS4i73EmqwA+CIy6iN7VaykHOrAX1Lta76M5+rrmcVDvaX1v1uQrHdQuuagP1BRdXfM6qLe1flk2cUWP7D8BrBOd0I8CL2vqMVPPU2zrxJuC3sMCg9wX+Bloz3ue4kKbHfDTUa/nRc1nADmAzcRFdircZT8mhQ0AXwCewkZLF7hFOsMKQfyYVO70WlvjxbMFvJVSOVHPp+PFR4KPXF1577/kBIbqKg+DTBSWhPzPBnkl2CJ1NfEnvA/gjcCUm1P+Aew2vg+M/8QPcrREFkSbBNoAAAAASUVORK5CYII=',
    iconClass: 'ic-blue',
  },
  {
    col: 1,
    program: 'تشكيل المعادن والتصنيع المتقدم',
    title: 'فني تصنيع',
    description: 'يقيّم ويشكل المعادن بدقة عالية',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIUlEQVR4nO2ZTU4CQRCF3wbiGfAn8SJs2HgbE13o0ru4kBhZeQMncwIXJHALJC4pN0VCJiDNFNBVPe9LZsEMr6A/p3uqBSCEEEKCUAOocn+JyFQAvozSD33deaqG9ENfFyu0PtPA2tz1IagyDYx3pJHO3JE1Hx55Hx4pULqRYqczIeUgxqPzCAXaaCuCAhUKNEKBRijQCAUa2SYiZV9Ngco2ESn7agpUOIWNUGDJAq8AvAP4BHDrNO9SYA/APYCfjQ/6BfAC4MJZ3p3AOwAzLb4C8KrHSs/N9T3/5ecnzM8aeTdtzA2AyUbhbwDDjetDPbe+PtFMrvwHgGsPbUwfwDOApRZcAHjUadSkp9cW+t6lZs+Zf2jks0/h6UaxNwCDhMwlgPGW/62N9dqp8wP9ruJB4LrQqEV2pH+Aaea8C4GWJaCfOf8UWWBU3AisjT9e58q7EVgZf7w+Rf6sfWCJU7g6Zx9YosAU3AisuQZuLyQ7jtQ1LHc+jMBd5M6n1j9ZIWmcbysgV/7Q+kcvJIkD2LUG5cy7aGMkcQD71rAceRdtjHAK2woJHyK2QpI4gH1rWK58doGR98KhBEaFAksRWDvcC7vqAyXgXthVHyhsY9oVEjbStkISeC8cSmDlcC8cSuAucucPrX/0QsKHiK2QBN4Lu+gDI++FXfSBpUOBpQisHe6FQwmsHK6BoQRGhQK9CezqYUY6fhBCCCGEEEJwZP4AUj9q64sCLhQAAAAASUVORK5CYII=',
    iconClass: 'ic-purple',
  },
  {
    col: 1,
    program: 'تشكيل المعادن والتصنيع المتقدم',
    title: 'فني لحام',
    description: 'يربط المعادن باللحام بمستويات احترافية',
    icon: fireIcon, 
    iconClass: 'ic-red',
  },
  {
    col: 1,
    program: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    title: 'فني أوتوترونكس',
    description: 'يصون الأنظمة الكهربائية للمركبات الحديثة',
    icon: carIcon,
    iconClass: 'ic-cyan',
  },
  {
    col: 1,
    program: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    title: 'مستشار خدمة',
    description: 'يرشد العملاء ويوجه الخدمات الفنية',
    icon: targetIcon,
    iconClass: 'ic-yellow',
  },
  {
    col: 1,
    program: 'ميكاترونكس المركبات الهجينة/الكهربائية',
    title: 'فني مركبات كهربائية',
    description: 'يصون وينقّح بطاريات وأنظمة المركبات الكهربائية',
    icon: electricIcon,
    iconClass: 'ic-orange',
  },

  // Column 2
  {
    col: 2,
    program: 'فني الميكانيك وأنظمة الأنابيب الصناعية',
    title: 'فني ميكانيك صناعي',
    description: 'يركب وينشئ أنظمة الأنابيب الصناعية',
    icon: wrenchIcon,
    iconClass: 'ic-brown',
  },
  {
    col: 2,
    program: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    title: 'فني إنتاج',
    description: 'يدير خطوط الإنتاج والمعدات الآلية',
    icon: gearIcon,
    iconClass: 'ic-blue',
  },
  {
    col: 2,
    program: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    title: 'فني صيانة',
    description: 'يضمن استمرارية الأداء وتقليل التعطل',
    icon: toolsIcon,
    iconClass: 'ic-purple',
  },
  {
    col: 2,
    program: 'إلكتروني تركيب وصيانة الأجهزة الإلكترونية الصناعية',
    title: 'فني إلكترونيات',
    description: 'يركب ويصون الأجهزة الإلكترونية الصناعية',
    icon: antennaIcon,
    iconClass: 'ic-teal',
  },
  {
    col: 2,
    program: 'أنظمة التبريد الصناعية',
    title: 'فني تبريد',
    description: 'يصمم وينشئ أنظمة التبريد الصناعية المتكاملة',
    icon: snowIcon,
    iconClass: 'ic-pink',
  },
  {
    col: 2,
    program: 'التصميم والتصنيع الرقمي',
    title: 'مشغل CNC',
    description: 'ينفذ برامج التشغيل الآلي بدقة عالية',
    icon: monitorIcon,
    iconClass: 'ic-yellow',
  },
  {
    col: 2,
    program: 'التصميم والتصنيع الرقمي',
    title: 'فني تصنيع رقمي',
    description: 'يحول التصاميم الرقمية إلى منتجات حقيقية',
    icon: rulerIcon,
    iconClass: 'ic-green',
  },
  {
    col: 2,
    program: 'أنظمة الطاقة المتجددة',
    title: 'فني طاقة',
    description: 'يركب ويصون أنظمة الطاقة المتجددة',
    icon: solarIcon,
    iconClass: 'ic-green',
  },

  // Column 4
  {
    col: 4,
    program: 'تكنولوجيا إدارة النظم والشبكات',
    title: 'مسؤول شبكات',
    description: 'يدير ويأمّن البنية التحتية للشبكات',
    icon: globeIcon,
    iconClass: 'ic-blue',
  },
  {
    col: 4,
    program: 'المواد المتقدمة (ألياف الكربون)',
    title: 'فني مواد',
    description: 'يستخدم المواد المتقدمة في التطبيقات الصناعية',
    icon: shieldIcon,
    iconClass: 'ic-blue',
  },
  {
    col: 4,
    program: 'الأنظمة الكهربائية المتكاملة في المباني الذكية',
    title: 'فني مباني ذكية',
    description: 'يركب الأنظمة الكهربائية في المباني الحديثة',
    icon: homeIcon,
    iconClass: 'ic-red',
  },
  {
    col: 4,
    program: 'فني أنظمة التكييف والتبريد وأتمتتها',
    title: 'فني HVAC',
    description: 'يركب ويصون أنظمة التهوية والتكييف',
    icon: snowIcon,
    iconClass: 'ic-red',
  },
  {
    col: 4,
    program: 'تمديدات صحية وتدفئة',
    title: 'سباك',
    description: 'يركب وينظم أنظمة المياه والصرف',
    icon: wrenchIcon,
    iconClass: 'ic-purple',
  },
  {
    col: 4,
    program: 'كهرباء الشاحنات والحافلات',
    title: 'فني كهرباء مركبات',
    description: 'يصيان ويصلح الأنظمة الكهربائية للشاحنات',
    icon: busIcon,
    iconClass: 'ic-pink',
  },
  {
    col: 4,
    program: 'ميكانيك الشاحنات والحافلات',
    title: 'فني ميكانيك',
    description: 'يصون محركات ومحاور المركبات الثقيلة',
    icon: truckIcon,
    iconClass: 'ic-orange',
  },
  {
    col: 4,
    program: 'تكنولوجيا الإنشاءات والهياكل المعدنية',
    title: 'فني إنشاءات',
    description: 'يركب الهياكل المعدنية بدقة هندسية',
    icon: craneIcon,
    iconClass: 'ic-blue',
  },

  // Column 5
  {
    col: 5,
    program: 'تصميم الأزياء الرقمي (CAD Fashion)',
    title: 'مصمم رقمي',
    description: 'يصمم الأزياء باستخدام أدوات CAD حديثة',
    icon: fashionIcon,
    iconClass: 'ic-yellow',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Associate Programmer',
    description: 'يطور برمجيات وتطبيقات الأنظمة',
    icon: laptopIcon,
    iconClass: 'ic-red',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'UI/UX',
    description: 'يصمم تجارب المستخدم البديهية والجذابة',
    icon: paletteIcon,
    iconClass: 'ic-purple',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Front-End',
    description: 'يبني واجهات تفاعلية وديناميكية',
    icon: frontendIcon,
    iconClass: 'ic-orange',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Back-End',
    description: 'يطور منطق الخادم وإدارة البيانات',
    icon: gearIcon,
    iconClass: 'ic-blue',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Database',
    description: 'يدير قواعد البيانات وضمان سلامتها',
    icon: databaseIcon,
    iconClass: 'ic-cyan',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Mobile Applications',
    description: 'يطور تطبيقات الهاتف الذكي',
    icon: mobileIcon,
    iconClass: 'ic-teal',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Software Testing',
    description: 'يختبر البرمجيات ويضمن جودتها',
    icon: checkIcon,
    iconClass: 'ic-green',
  },
];

export default function CardGrid({ selectedCard, onCardSelect, onMouseEnter, onMouseLeave, needleRotation }) {
  const mainGridRef = useRef(null);
  const connectorSvgRef = useRef(null);

  // Group cards by column
  const columns = {
    1: CARDS_DATA.filter(c => c.col === 1),
    2: CARDS_DATA.filter(c => c.col === 2),
    4: CARDS_DATA.filter(c => c.col === 4),
    5: CARDS_DATA.filter(c => c.col === 5),
  };

  useEffect(() => {
    if (window.innerWidth > 1100) {
      drawConnectors();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        drawConnectors();
      } else if (connectorSvgRef.current) {
        connectorSvgRef.current.innerHTML = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawConnectors = () => {
    const mainGrid = mainGridRef.current;
    const connectorSvg = connectorSvgRef.current;
    if (!connectorSvg || !mainGrid) return;

    const gridRect = mainGrid.getBoundingClientRect();
    const width = mainGrid.clientWidth;
    const height = mainGrid.scrollHeight;
    const compass = document.querySelector('.compass-wrap');
    if (!compass) return;
    const compassRect = compass.getBoundingClientRect();

    connectorSvg.innerHTML = '';
    connectorSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    connectorSvg.setAttribute('width', width);
    connectorSvg.setAttribute('height', height);
    connectorSvg.setAttribute('preserveAspectRatio', 'none');

    // Add defs for filter
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'lineGlow');
    filter.setAttribute('x', '-120%');
    filter.setAttribute('y', '-120%');
    filter.setAttribute('width', '340%');
    filter.setAttribute('height', '340%');

    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '1.8');
    blur.setAttribute('result', 'blur');

    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const m1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m1.setAttribute('in', 'blur');
    const m2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m2.setAttribute('in', 'SourceGraphic');

    merge.appendChild(m1);
    merge.appendChild(m2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    connectorSvg.appendChild(defs);

//  const strokeMap = {
//   /* MAIN RED */
//   'ic-red': 'rgba(156, 13, 19, 0.85)',

//   /* GOLD */
//   'ic-blue': 'rgba(196, 123, 42, 0.85)',

//   /* DARK RED */
//   'ic-green': 'rgba(139, 30, 36, 0.85)',

//   /* SOFT GOLD */
//   'ic-orange': 'rgba(214, 156, 82, 0.85)',

//   /* DARK WINE */
//   'ic-purple': 'rgba(92, 19, 32, 0.85)',

//   /* LIGHT BEIGE GOLD */
//   'ic-cyan': 'rgba(224, 194, 150, 0.85)',

//   /* PREMIUM GOLD */
//   'ic-yellow': 'rgba(212, 167, 98, 0.85)',

//   /* ROSE RED */
//   'ic-pink': 'rgba(176, 52, 62, 0.85)',

//   /* BRONZE */
//   'ic-teal': 'rgba(161, 104, 58, 0.85)',

//   /* DARK BROWN */
//   'ic-brown': 'rgba(78, 45, 32, 0.85)',
// };
const strokeMap = {
  'ic-red':    'rgba(171, 19, 28, 0.85)',   // red — compass NE arc
  'ic-blue':   'rgba(138, 104, 32, 0.85)',  // dark gold — compass ES arc
  'ic-green':  'rgba(30, 136, 120, 0.85)',  // teal — compass SW arc
  'ic-orange': 'rgba(122, 90, 191, 0.85)',  // purple — compass WN arc
  'ic-purple': 'rgba(171, 19, 28, 0.72)',
  'ic-cyan':   'rgba(138, 104, 32, 0.72)',
  'ic-yellow': 'rgba(30, 136, 120, 0.72)',
  'ic-pink':   'rgba(122, 90, 191, 0.72)',
  'ic-teal':   'rgba(171, 19, 28, 0.60)',
  'ic-brown':  'rgba(138, 104, 32, 0.60)',
};
//     const cards = mainGrid.querySelectorAll('.card');
//     cards.forEach((card) => {
//       const cardRect = card.getBoundingClientRect();
//       const iconEl = card.querySelector('.card-icon');
//       const iconClass = iconEl
//         ? Array.from(iconEl.classList).find((className) => className.startsWith('ic-'))
//         : null;
//       const x1 = cardRect.left + cardRect.width / 2 - gridRect.left;
//       const y1 = cardRect.top + cardRect.height / 2 - gridRect.top;
//       const x2 = compassRect.left + compassRect.width / 2 - gridRect.left;
//       const y2 = compassRect.top + compassRect.height / 2 - gridRect.top;
//       const dx = x2 - x1;
//       const c1x = x1 + dx * 0.38;
//       const c1y = y1;
//       const c2x = x2 - dx * 0.38;
//       const c2y = y2;

//       const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//       path.setAttribute('d', `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`);
//       path.setAttribute('fill', 'none');
//       path.setAttribute('stroke', strokeMap[iconClass] || 'rgba(156,13,19,0.22)');
//       path.setAttribute('stroke-width', '2');
//       path.setAttribute('stroke-linecap', 'round');
//       path.setAttribute('opacity', '0.7');
//       path.setAttribute('filter', 'url(#lineGlow)');
//       connectorSvg.appendChild(path);
//     });
//   };const cards = mainGrid.querySelectorAll('.card');
const cards = mainGrid.querySelectorAll('.card');

function getCardColumnIndex(card) {
  const col = card.closest('.col');

  if (!col) return -1;

  return Array.from(
    mainGrid.querySelectorAll('.col')
  ).indexOf(col);
}

// =========================
// COMPASS CENTER
// =========================

const compassCenterX =
  compassRect.left +
  compassRect.width / 2 -
  gridRect.left;

const compassCenterY =
  compassRect.top +
  compassRect.height / 2 -
  gridRect.top;

const compassRadius =
  compassRect.width / 2 - 12;

// =========================
// LEFT + RIGHT CARDS
// =========================

const leftCards = [];
const rightCards = [];

cards.forEach((card) => {

  const colIdx = getCardColumnIndex(card);

  // LEFT COLUMN
  if (colIdx === 2) {
    leftCards.push(card);
  }

  // RIGHT COLUMN
  if (colIdx === 1) {
    rightCards.push(card);
  }

});

// =========================
// SORT TOP -> BOTTOM
// VERY IMPORTANT
// =========================

function sortCardsTopToBottom(arr) {

  return arr.sort((a, b) => {

    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return aRect.top - bRect.top;

  });

}

sortCardsTopToBottom(leftCards);
sortCardsTopToBottom(rightCards);

// =========================
// DRAW FUNCTION
// =========================

function drawConnections(cardList, side) {

  const total = cardList.length;

  cardList.forEach((card, index) => {

    const cardRect =
      card.getBoundingClientRect();

    const iconEl =
      card.querySelector('.card-icon');

    const iconClass = iconEl
      ? Array.from(iconEl.classList).find((c) =>
          c.startsWith('ic-')
        )
      : null;

    // =========================
    // CARD START
    // =========================

    let x1;

    if (side === 'left') {

      // start from RIGHT EDGE
      x1 =
        cardRect.right -
        gridRect.left;

    } else {

      // start from LEFT EDGE
      x1 =
        cardRect.left -
        gridRect.left;
    }

    const y1 =
      cardRect.top +
      cardRect.height / 2 -
      gridRect.top;

    // =========================
    // PERFECT ORDERED ANGLES
    // =========================

    let startAngle;
    let endAngle;

    if (side === 'left') {

      // TOP LEFT -> BOTTOM LEFT
      startAngle = 230;
      endAngle = 130;

    } else {

      // TOP RIGHT -> BOTTOM RIGHT
      startAngle = -50;
      endAngle = 50;
    }

    const angle =
      startAngle +
      ((endAngle - startAngle) / (total - 1)) *
        index;

    const rad =
      angle * (Math.PI / 180);

    // =========================
    // COMPASS POINT
    // =========================

    const x2 =
      compassCenterX +
      Math.cos(rad) * compassRadius;

    const y2 =
      compassCenterY +
      Math.sin(rad) * compassRadius;

    // =========================
    // CLEAN CURVE
    // =========================

    const midX = (x1 + x2) / 2;

    const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    path.setAttribute(
      'd',
      `
        M ${x1} ${y1}
        C ${midX} ${y1},
          ${midX} ${y2},
          ${x2} ${y2}
      `
    );

    path.setAttribute('fill', 'none');

    path.setAttribute(
      'stroke',
      strokeMap[iconClass] ||
        'rgba(156,13,19,0.22)'
    );

    path.setAttribute(
      'stroke-width',
      '2.4'
    );

    path.setAttribute(
      'stroke-linecap',
      'round'
    );

    path.setAttribute(
      'stroke-linejoin',
      'round'
    );

    path.setAttribute(
      'opacity',
      '0.92'
    );

    path.setAttribute(
      'filter',
      'url(#lineGlow)'
    );

    connectorSvg.appendChild(path);

    // =========================
    // DOT
    // =========================

    const dot = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    dot.setAttribute('cx', x2);
    dot.setAttribute('cy', y2);

    dot.setAttribute('r', '4.5');

    dot.setAttribute(
      'fill',
      strokeMap[iconClass] || '#999'
    );

    dot.setAttribute(
      'stroke',
      'rgba(255,255,255,0.75)'
    );

    dot.setAttribute(
      'stroke-width',
      '1'
    );

    connectorSvg.appendChild(dot);

  });

}

// =========================
// DRAW
// =========================

drawConnections(leftCards, 'left');
drawConnections(rightCards, 'right');

};

  return (
    <div className="main-grid" ref={mainGridRef}>
      <svg
        id="connector-svg"
        ref={connectorSvgRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 4 }}
      ></svg>

      {/* Column 1 */}
      <div className="col">
        {columns[1].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={() => onCardSelect(card)}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Column 2 */}
      <div className="col">
        {columns[2].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={() => onCardSelect(card)}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Center Compass */}
      <CompassWrap needleRotation={needleRotation} />

      {/* Column 4 */}
      <div className="col">
        {columns[4].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={() => onCardSelect(card)}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Column 5 */}
      <div className="col">
        {columns[5].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={() => onCardSelect(card)}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      <div className="hint" id="hint">
        <p>اضغط على أي بطاقة لعرض <strong>تفاصيل البرنامج التدريبي</strong> كاملاً</p>
      </div>
    </div>
  );
}
