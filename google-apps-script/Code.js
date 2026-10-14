/**
 * Istituti Leonardo Consulenza — Webhook
 * - Scrive sul foglio Google "Consulenza"
 * - Crea contatto + deal nella pipeline Relatia "ISTITUTI LEONARDO MILANO"
 *
 * Deploy: clasp push && clasp deploy
 * Il token Relatia sta in Config.gs (gitignored).
 */

var SPREADSHEET_ID = '1nk_0mD0nqDsfhXpKGGkVweKHyEL7ThtF7RlZuMTx8kE'
var SHEET_NAME = 'Consulenza'
var HEADERS = [
  'NOME',
  'COGNOME',
  'EMAIL',
  'NUMERO DI TELFONO',
  'PERCORSO STUDI',
  'NOTE',
]

var RELATIA_BASE = 'https://yesgroup.relatiacrm.com'
var RELATIA_PIPELINE_ID = 'c82d2483-6667-430c-af10-45944f86f5d7'
var RELATIA_STAGE_ID = '43526eae-fea9-45be-88fa-0b24ddfd76de' // NUOVO CONTATTO

var RELATIA_CUSTOM_FIELDS = {
  percorso: '13345987-9aa3-4f6c-8f7b-11f53ea3277b',
  note: 'e75a84fe-f9dc-4075-b829-53e907319772',
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}'
    var data = JSON.parse(raw)

    var firstName = String(data.first_name || data.nome || '')
    var lastName = String(data.last_name || data.cognome || '')
    var email = String(data.email || '')
    var phone = String(data.phone || data.telefono || data['numero di telefono'] || '')
    var percorso = String(data.percorso || data['percorso studi'] || '')
    var note = String(data.note || data.notes || '')

    var sheet = getConsulenzaSheet_()
    ensureHeaders_(sheet)
    sheet.appendRow([firstName, lastName, email, phone, percorso, note])

    var relatia = null
    var relatiaError = null
    try {
      relatia = createRelatiaLead_({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        percorso: percorso,
        note: note,
      })
    } catch (relatiaErr) {
      relatiaError = String(relatiaErr)
    }

    return json_({ ok: true, sheet: true, relatia: relatia, relatia_error: relatiaError })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  }
}

function doGet() {
  return json_({
    ok: true,
    service: 'istituti-leonardo-consulenza-leads',
    sheet: SHEET_NAME,
    pipeline: 'ISTITUTI LEONARDO MILANO',
  })
}

/** Usata solo per verificare foglio e Relatia da clasp. Non è il webhook. */
function ping() {
  var sheet = getConsulenzaSheet_()
  return { ok: true, name: sheet.getName(), lastRow: sheet.getLastRow() }
}

function getConsulenzaSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID)
  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)
  return sheet
}

function ensureHeaders_(sheet) {
  var current = String(sheet.getRange(1, 1).getValue() || '')
  if (current) return
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
}

function getRelatiaToken_() {
  var fromProps = PropertiesService.getScriptProperties().getProperty('RELATIA_TOKEN')
  if (fromProps) return fromProps
  if (typeof RELATIA_TOKEN !== 'undefined' && RELATIA_TOKEN) return RELATIA_TOKEN
  throw new Error('RELATIA_TOKEN mancante: configura Config.gs o Script Properties')
}

function buildCustomValues_(lead) {
  var values = []
  if (lead.percorso) {
    values.push({
      custom_field: RELATIA_CUSTOM_FIELDS.percorso,
      value_text: lead.percorso,
    })
  }
  if (lead.note) {
    values.push({
      custom_field: RELATIA_CUSTOM_FIELDS.note,
      value_text: lead.note,
    })
  }
  return values
}

function createRelatiaLead_(lead) {
  var token = getRelatiaToken_()
  var payload = {
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone,
  }
  var customValues = buildCustomValues_(lead)
  if (customValues.length) {
    payload.custom_values_create = customValues
  }

  var contactRes = relatiaFetch_('POST', '/api/contacts/', payload, token)
  var contactId = contactRes && contactRes.id
  if (!contactId) throw new Error('Relatia: contatto non creato')

  relatiaFetch_('POST', '/api/contacts/bulk-create-deals/', {
    contact_ids: [contactId],
    pipeline_id: RELATIA_PIPELINE_ID,
    stage_id: RELATIA_STAGE_ID,
  }, token)

  return { contact_id: contactId, pipeline_id: RELATIA_PIPELINE_ID }
}

function relatiaFetch_(method, path, body, token) {
  var res = UrlFetchApp.fetch(RELATIA_BASE + path, {
    method: method,
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    },
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true,
  })
  var code = res.getResponseCode()
  var text = res.getContentText()
  var parsed = {}
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    parsed = { raw: text }
  }
  if (code < 200 || code >= 300) {
    throw new Error('Relatia ' + method + ' ' + path + ' → HTTP ' + code + ' ' + text)
  }
  return parsed
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
