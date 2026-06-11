{{- define "db4fresh.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "-" }}
app.kubernetes.io/name: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "db4fresh.name" -}}
{{ .Chart.Name }}
{{- end }}

{{- define "db4fresh.fullname" -}}
{{ .Release.Name }}-{{ .Chart.Name }}
{{- end }}

{{- define "db4fresh.backend.fullname" -}}
{{ include "db4fresh.fullname" . }}-backend
{{- end }}

{{- define "db4fresh.frontend.fullname" -}}
{{ include "db4fresh.fullname" . }}-frontend
{{- end }}
