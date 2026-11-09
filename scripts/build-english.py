"""Build static English routes from the Italian pages; preserve assets and behavior."""
from pathlib import Path
from html.parser import HTMLParser
import html,json,re
ROOT=Path(__file__).resolve().parents[1]
COPY=json.loads((ROOT/'scripts/en-copy.json').read_text())
class Translate(HTMLParser):
    def __init__(self):super().__init__(convert_charrefs=False);self.out=[];self.skip=0
    def handle_starttag(self,tag,attrs):
        raw=self.get_starttag_text()
        if tag in ('script','style'):self.skip+=1
        for key,value in attrs:
            if value in COPY and (key in ('alt','aria-label','placeholder','data-note','data-button','data-shot-title','title') or tag=='meta' and key=='content'):
                raw=raw.replace(key+'="'+html.escape(value,quote=True)+'"',key+'="'+html.escape(COPY[value],quote=True)+'"')
                raw=raw.replace(key+'="'+value+'"',key+'="'+html.escape(COPY[value],quote=True)+'"')
        self.out.append(raw)
    def handle_startendtag(self,t,a):self.handle_starttag(t,a)
    def handle_endtag(self,t):
        self.out.append('</'+t+'>')
        if t in ('script','style'):self.skip-=1
    def handle_data(self,s):
        key=s.strip()
        self.out.append(s if self.skip or key not in COPY else s.replace(key,html.escape(COPY[key],quote=False),1))
    def handle_entityref(self,s):self.out.append('&'+s+';')
    def handle_charref(self,s):self.out.append('&#'+s+';')
    def handle_comment(self,s):self.out.append('<!--'+s+'-->')
    def handle_decl(self,s):self.out.append('<!'+s+'>')
def finish(s,it,en,language):
    # Rebuild only our own additions, making repeated generation idempotent.
    s=re.sub(r'<span class="language-switch".*?</span>','',s)
    s=re.sub(r'<link[^>]+data-gliffo-language[^>]*>','',s)
    s=re.sub(r'<script[^>]+src="/i18n-runtime.js[^\"]*"[^>]*></script>','',s)
    s=re.sub(r'<link[^>]+href="/language.css[^\"]*"[^>]*>','',s)
    label='Language' if language=='en' else 'Lingua'
    switch='<span class="language-switch" role="group" aria-label="'+label+'">'+''.join('<a href="'+path+'" lang="'+lang+'" hreflang="'+lang+'"'+(' aria-current="page"' if lang==language else '')+'>'+lang.upper()+'</a>' for lang,path in [('it',it),('en',en)])+'</span>'
    if '<nav' in s:s=s.replace('</nav>',switch+'</nav>',1)
    else:s=s.replace('</header>',switch+'</header>',1)
    tags='<link rel="canonical" data-gliffo-language href="https://gliffo.github.io'+(en if language=='en' else it)+'">'+''.join('<link rel="alternate" data-gliffo-language hreflang="'+lang+'" href="https://gliffo.github.io'+path+'">' for lang,path in [('it',it),('en',en),('x-default',it)])
    s=s.replace('</head>',tags+'<link rel="stylesheet" href="/language.css?v=1"></head>')
    # All existing scripts are deferred; language helpers run before them.
    s=s.replace('</head>','<script src="/i18n-runtime.js?v=1" defer></script></head>')
    if 'class="beta-native-form"' in s or 'beta-native-form' in s:
        s=re.sub(r'<input[^>]+name="language"[^>]*>','',s)
        s=s.replace('name="gliffo_beta_source"','name="gliffo_beta_source"',1)
        s=s.replace('name="gliffo_beta_source" value="GLIFFO_BETA_mgaarvej">','name="gliffo_beta_source" value="GLIFFO_BETA_mgaarvej"><input type="hidden" name="language" value="'+language+'">')
    return s
for relative,it,en in [('index.html','/','/en/'),('beta/download/index.html','/beta/download/','/en/beta/download/'),('feedback/index.html','/feedback/','/en/feedback/')]:
    source=(ROOT/relative).read_text()
    # Use pristine Italian content when regenerating (strip our language additions).
    source=re.sub(r'<span class="language-switch".*?</span>','',source)
    source=re.sub(r'<link[^>]+data-gliffo-language[^>]*>','',source)
    source=re.sub(r'<script[^>]+src="/i18n-runtime.js[^\"]*"[^>]*></script>','',source)
    source=re.sub(r'<link[^>]+href="/language.css[^\"]*"[^>]*>','',source)
    parser=Translate();parser.feed(source);english=''.join(parser.out).replace('<html lang="it"','<html lang="en"')
    for before,after in [('/', '/en/'),('/feedback/','/en/feedback/'),('/beta/download/','/en/beta/download/')]:english=english.replace('href="'+before+'"','href="'+after+'"')
    if relative=='index.html':
        english=english.replace('We use your email to send you access to the Beta.','We use your email to send you access to the Beta. The app, screenshots and welcome email are currently in Italian.')
    if relative=='feedback/index.html':
        english=english.replace('<div class="form-surface">','<p class="language-note">The feedback form is currently in Italian. You can write your feedback in English.</p><div class="form-surface">')
    if relative=='beta/download/index.html':
        english=english.replace('/downloads/LEGGIMI_MAC.txt','/downloads/README_MAC_EN.txt').replace('/downloads/LEGGIMI_WINDOWS.txt','/downloads/README_WINDOWS_EN.txt')
    (ROOT/relative).write_text(finish(source,it,en,'it'))
    output=ROOT/en.strip('/')/'index.html';output.parent.mkdir(parents=True,exist_ok=True);output.write_text(finish(english,it,en,'en'))

# Keep the client-side messages in sync with the same translation catalog.
runtime=ROOT/'i18n-runtime.js'
if runtime.exists():
    payload=json.dumps(COPY,ensure_ascii=False,separators=(',',':'))
    runtime.write_text(re.sub(r'(?<=,copy=).*(?=;window.GliffoI18n=)',lambda _:payload,runtime.read_text(),flags=re.S))
