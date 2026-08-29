'use client';

import { useEffect, useState } from 'react';

type AnyContent = Record<string, any>;

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState<AnyContent | null>(null);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const response = await fetch('/api/content', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Failed to load content');
        return;
      }

      setContent(data.content);
    } catch {
      setMessage('حدث خطأ أثناء تحميل المحتوى');
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function login() {
    setMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }

      setLoggedIn(true);
      setPassword('');
      setMessage('تم تسجيل الدخول');
    } catch {
      setMessage('حدث خطأ أثناء تسجيل الدخول');
    }
  }

  async function save() {
    if (!content) return;

    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      setMessage(
        response.ok
          ? 'تم حفظ التغييرات'
          : data.error || 'حدث خطأ أثناء الحفظ'
      );
    } catch {
      setMessage('حدث خطأ أثناء حفظ التغييرات');
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    setLoggedIn(false);
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md border border-[#D4AF37]/30 rounded-2xl bg-[#111] p-8">
          <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">
            SD Media CMS
          </h1>

          <p className="text-gray-400 mb-6">
            لوحة إدارة محتوى الموقع
          </p>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
            type="password"
            placeholder="CMS password"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 mb-4"
          />

          <button
            onClick={login}
            className="w-full rounded-lg bg-[#D4AF37] text-black font-bold py-3"
          >
            دخول
          </button>

          {message && (
            <p className="mt-4 text-sm text-gray-300">
              {message}
            </p>
          )}
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white p-6">
        Loading...
      </main>
    );
  }

  const update = (path: string[], value: any) => {
    setContent((prev) => {
      if (!prev) {
        return prev;
      }

      const next: AnyContent = structuredClone(prev);

      let cursor: any = next;

      path.slice(0, -1).forEach((key) => {
        cursor = cursor[key];
      });

      cursor[path[path.length - 1]] = value;

      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#D4AF37]">
              SD Media CMS
            </h1>

            <p className="text-gray-400">
              إدارة محتوى الموقع من مكان واحد
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#D4AF37] text-black font-bold"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg border border-gray-700"
            >
              خروج
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-[#D4AF37]/30 p-3 text-sm">
            {message}
          </div>
        )}

        <section className="grid md:grid-cols-2 gap-6">

          <EditorCard title="بيانات الشركة">
            <Field
              label="اسم الشركة"
              value={content.site.name}
              onChange={(v) => update(['site', 'name'], v)}
            />

            <Field
              label="البريد"
              value={content.site.email}
              onChange={(v) => update(['site', 'email'], v)}
            />

            <Field
              label="الهاتف"
              value={content.site.phone}
              onChange={(v) => update(['site', 'phone'], v)}
            />

            <Field
              label="الموقع"
              value={content.site.location}
              onChange={(v) => update(['site', 'location'], v)}
            />

            <Field
              label="Facebook"
              value={content.site.social.facebook}
              onChange={(v) =>
                update(['site', 'social', 'facebook'], v)
              }
            />

            <Field
              label="Instagram"
              value={content.site.social.instagram}
              onChange={(v) =>
                update(['site', 'social', 'instagram'], v)
              }
            />

            <Field
              label="LinkedIn"
              value={content.site.social.linkedin}
              onChange={(v) =>
                update(['site', 'social', 'linkedin'], v)
              }
            />
          </EditorCard>

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الرئيسية — ${locale.toUpperCase()}`}
            >
              <Field
                label="العنوان"
                value={content.home[locale].title}
                onChange={(v) =>
                  update(['home', locale, 'title'], v)
                }
              />

              <TextArea
                label="الوصف"
                value={content.home[locale].subtitle}
                onChange={(v) =>
                  update(['home', locale, 'subtitle'], v)
                }
              />

              <Field
                label="زر الدعوة"
                value={content.home[locale].cta}
                onChange={(v) =>
                  update(['home', locale, 'cta'], v)
                }
              />
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`من نحن — ${locale.toUpperCase()}`}
            >
              {Object.keys(content.about[locale]).map((key) => (
                <TextArea
                  key={key}
                  label={key}
                  value={content.about[locale][key]}
                  onChange={(v) =>
                    update(['about', locale, key], v)
                  }
                />
              ))}
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الخدمات — ${locale.toUpperCase()}`}
            >
              {content.capabilities[locale].map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-lg p-4 mb-3"
                  >
                    <Field
                      label={`الخدمة ${index + 1}`}
                      value={item.title}
                      onChange={(v) =>
                        update(
                          ['capabilities', locale, index, 'title'],
                          v
                        )
                      }
                    />

                    <TextArea
                      label="الوصف"
                      value={item.desc}
                      onChange={(v) =>
                        update(
                          ['capabilities', locale, index, 'desc'],
                          v
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        setContent((prev) => {
                          if (!prev) return prev;

                          const next = structuredClone(prev);

                          next.capabilities[locale].splice(
                            index,
                            1
                          );

                          return next;
                        })
                      }
                      className="text-red-400 text-sm"
                    >
                      حذف الخدمة
                    </button>
                  </div>
                )
              )}

              <button
                onClick={() =>
                  setContent((prev) => {
                    if (!prev) return prev;

                    const next = structuredClone(prev);

                    next.capabilities[locale].push({
                      title: 'New Service',
                      desc: 'Service description',
                    });

                    return next;
                  })
                }
                className="w-full py-2 border border-gray-700 rounded-lg"
              >
                + إضافة خدمة
              </button>
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الإحصائيات — ${locale.toUpperCase()}`}
            >
              {content.stats[locale].map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-3 mb-3"
                  >
                    <Field
                      label="الرقم"
                      value={item.num}
                      onChange={(v) =>
                        update(
                          ['stats', locale, index, 'num'],
                          v
                        )
                      }
                    />

                    <Field
                      label="الوصف"
                      value={item.label}
                      onChange={(v) =>
                        update(
                          ['stats', locale, index, 'label'],
                          v
                        )
                      }
                    />
                  </div>
                )
              )}
            </EditorCard>
          ))}

        </section>
      </div>
    </main>
  );
}

function EditorCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-gray-800 bg-[#111] rounded-2xl p-5">
      <h2 className="text-xl font-bold text-[#D4AF37] mb-5">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs text-gray-400 mb-2">
        {label}
      </span>

      <input
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs text-gray-400 mb-2">
        {label}
      </span>

      <textarea
        rows={3}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
      />
    </label>
  );
        }          <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">
            SD Media CMS
          </h1>

          <p className="text-gray-400 mb-6">
            لوحة إدارة محتوى الموقع
          </p>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login();
              }
            }}
            type="password"
            placeholder="CMS password"
            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 mb-4"
          />

          <button
            onClick={login}
            className="w-full rounded-lg bg-[#D4AF37] text-black font-bold py-3"
          >
            دخول
          </button>

          {message && (
            <p className="mt-4 text-sm text-gray-300">
              {message}
            </p>
          )}
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white p-6">
        Loading...
      </main>
    );
  }

  const update = (path: string[], value: unknown) => {
    setContent((prev) => {
      if (!prev) {
        return prev;
      }

      const next: AnyContent = structuredClone(prev);
      let cursor: AnyContent = next;

      for (const key of path.slice(0, -1)) {
        if (
          cursor[key] === null ||
          typeof cursor[key] !== 'object'
        ) {
          cursor[key] = {};
        }

        cursor = cursor[key];
      }

      cursor[path[path.length - 1]] = value;

      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#D4AF37]">
              SD Media CMS
            </h1>

            <p className="text-gray-400">
              إدارة محتوى الموقع من مكان واحد
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#D4AF37] text-black font-bold disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>

            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg border border-gray-700"
            >
              خروج
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-[#D4AF37]/30 p-3 text-sm">
            {message}
          </div>
        )}

        <section className="grid md:grid-cols-2 gap-6">

          <EditorCard title="بيانات الشركة">
            <Field
              label="اسم الشركة"
              value={content.site.name}
              onChange={(v) => update(['site', 'name'], v)}
            />

            <Field
              label="البريد"
              value={content.site.email}
              onChange={(v) => update(['site', 'email'], v)}
            />

            <Field
              label="الهاتف"
              value={content.site.phone}
              onChange={(v) => update(['site', 'phone'], v)}
            />

            <Field
              label="الموقع"
              value={content.site.location}
              onChange={(v) => update(['site', 'location'], v)}
            />

            <Field
              label="Facebook"
              value={content.site.social.facebook}
              onChange={(v) =>
                update(['site', 'social', 'facebook'], v)
              }
            />

            <Field
              label="Instagram"
              value={content.site.social.instagram}
              onChange={(v) =>
                update(['site', 'social', 'instagram'], v)
              }
            />

            <Field
              label="LinkedIn"
              value={content.site.social.linkedin}
              onChange={(v) =>
                update(['site', 'social', 'linkedin'], v)
              }
            />
          </EditorCard>

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الرئيسية — ${locale.toUpperCase()}`}
            >
              <Field
                label="العنوان"
                value={content.home[locale].title}
                onChange={(v) =>
                  update(['home', locale, 'title'], v)
                }
              />

              <TextArea
                label="الوصف"
                value={content.home[locale].subtitle}
                onChange={(v) =>
                  update(['home', locale, 'subtitle'], v)
                }
              />

              <Field
                label="زر الدعوة"
                value={content.home[locale].cta}
                onChange={(v) =>
                  update(['home', locale, 'cta'], v)
                }
              />
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`من نحن — ${locale.toUpperCase()}`}
            >
              {Object.keys(content.about[locale]).map((key) => (
                <TextArea
                  key={key}
                  label={key}
                  value={content.about[locale][key]}
                  onChange={(v) =>
                    update(['about', locale, key], v)
                  }
                />
              ))}
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الخدمات — ${locale.toUpperCase()}`}
            >
              {content.capabilities[locale].map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-lg p-4 mb-3"
                  >
                    <Field
                      label={`الخدمة ${index + 1}`}
                      value={item.title}
                      onChange={(v) =>
                        update([
                          'capabilities',
                          locale,
                          index,
                          'title',
                        ], v)
                      }
                    />

                    <TextArea
                      label="الوصف"
                      value={item.desc}
                      onChange={(v) =>
                        update([
                          'capabilities',
                          locale,
                          index,
                          'desc',
                        ], v)
                      }
                    />

                    <button
                      onClick={() =>
                        setContent((prev) => {
                          if (!prev) return prev;

                          const next: AnyContent =
                            structuredClone(prev);

                          next.capabilities[locale].splice(
                            index,
                            1
                          );

                          return next;
                        })
                      }
                      className="text-red-400 text-sm"
                    >
                      حذف الخدمة
                    </button>
                  </div>
                )
              )}

              <button
                onClick={() =>
                  setContent((prev) => {
                    if (!prev) return prev;

                    const next: AnyContent =
                      structuredClone(prev);

                    next.capabilities[locale].push({
                      title: 'New Service',
                      desc: 'Service description',
                    });

                    return next;
                  })
                }
                className="w-full py-2 border border-gray-700 rounded-lg"
              >
                + إضافة خدمة
              </button>
            </EditorCard>
          ))}

          {(['ar', 'en'] as const).map((locale) => (
            <EditorCard
              key={locale}
              title={`الإحصائيات — ${locale.toUpperCase()}`}
            >
              {content.stats[locale].map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-3 mb-3"
                  >
                    <Field
                      label="الرقم"
                      value={String(item.num ?? '')}
                      onChange={(v) =>
                        update([
                          'stats',
                          locale,
                          index,
                          'num',
                        ], v)
                      }
                    />

                    <Field
                      label="الوصف"
                      value={String(item.label ?? '')}
                      onChange={(v) =>
                        update([
                          'stats',
                          locale,
                          index,
                          'label',
                        ], v)
                      }
                    />
                  </div>
                )
              )}
            </EditorCard>
          ))}

        </section>
      </div>
    </main>
  );
}

function EditorCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-gray-800 bg-[#111] rounded-2xl p-5">
      <h2 className="text-xl font-bold text-[#D4AF37] mb-5">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Field({label,value,onChange}:{label:string;value:string|number;onChange:(v:string)=>void}){return <label className="block mb-4"><span className="block text-xs text-gray-400 mb-2">{label}</span><input value={value ?? ''} onChange={e=>onChange(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2" /></label>}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-xs text-gray-400 mb-2">
        {label}
      </span>

      <textarea
        rows={3}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2"
      />
    </label>
  );
                   }
