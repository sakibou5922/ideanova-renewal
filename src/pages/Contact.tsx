import { useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { site } from '../data/site';
import { pageTitle, useDocumentMeta } from '../lib/useDocumentMeta';
import styles from './Contact.module.css';

type Category = '' | 'agri' | 'cosme' | 'other';

type FormValues = {
  name: string;
  company: string;
  email: string;
  tel: string;
  category: Category;
  message: string;
  agree: boolean;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  name: '',
  company: '',
  email: '',
  tel: '',
  category: '',
  message: '',
  agree: false,
};

const categories: Array<{ value: Exclude<Category, ''>; label: string }> = [
  { value: 'agri', label: '農業支援事業について' },
  { value: 'cosme', label: '化粧水事業について' },
  { value: 'other', label: 'その他' },
];

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'お名前を入力してください。';
  if (!v.email.trim()) {
    e.email = 'メールアドレスを入力してください。';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    e.email = 'メールアドレスの形式が正しくありません。';
  }
  if (v.tel && !/^[0-9+\-() ]{8,20}$/.test(v.tel)) {
    e.tel = '電話番号は半角数字とハイフンで入力してください。';
  }
  if (!v.category) e.category = 'お問い合わせ種別を選択してください。';
  if (!v.message.trim()) e.message = 'お問い合わせ内容を入力してください。';
  else if (v.message.length > 2000) e.message = 'お問い合わせ内容は2000文字以内で入力してください。';
  if (!v.agree) e.agree = 'プライバシーポリシーへの同意が必要です。';
  return e;
}

export function Contact() {
  useDocumentMeta({
    title: pageTitle('お問い合わせ'),
    description:
      '株式会社ideanovaへのお問い合わせ。農業支援事業・化粧水事業に関するご相談はフォームまたはお電話でご連絡ください。',
  });

  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const uid = useId();
  const id = (k: keyof FormValues) => `${uid}-${k}`;
  const errId = (k: keyof FormValues) => `${uid}-${k}-error`;

  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const first = (Object.keys(e) as Array<keyof FormValues>)[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    // [要確認] 送信先（メール / フォームサービス）が未確定のため、送信処理は未接続。
    setStatus('submitting');
    window.setTimeout(() => setStatus('done'), 400);
  };

  if (status === 'done') {
    return (
      <div className={`container container--narrow ${styles.done}`} role="status">
        <h1 className="pageTitle">
          <span className="pageTitleEn">Thank you</span>
          お問い合わせ内容を受け付けました
        </h1>
        <p className={styles.doneNote}>
          ※ 現在フォームの送信先は未設定です（要確認）。本番公開前に送信処理を接続してください。
        </p>
        <p className={styles.doneLink}>
          <Link to="/">トップページへ戻る</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pageHead">
        <h1 className="pageTitle">
          <span className="pageTitleEn">Contact</span>
          お問い合わせ
        </h1>
        <p className="pageLede">
          農業支援事業・化粧水事業に関するご相談、その他のお問い合わせは下記フォームまたはお電話にてご連絡ください。
        </p>
      </div>

      <div className={styles.split}>
        <aside className={styles.rail}>
          <p className={styles.railLabel}>お電話でのお問い合わせ</p>
          <a href={`tel:${site.tel.replaceAll('-', '')}`} className={styles.telLink}>
            {site.tel}
          </a>
          <p className={styles.telNote}>受付時間 要確認</p>
          <address className={styles.address}>
            {site.name}
            <br />
            {site.postalCode}
            <br />
            {site.address}
          </address>
        </aside>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <Field id={id('name')} label="お名前" required error={errors.name} errorId={errId('name')}>
          <input
            id={id('name')}
            className={styles.input}
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errId('name') : undefined}
          />
        </Field>

        <Field id={id('company')} label="会社名・団体名">
          <input
            id={id('company')}
            className={styles.input}
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </Field>

        <Field id={id('email')} label="メールアドレス" required error={errors.email} errorId={errId('email')}>
          <input
            id={id('email')}
            className={styles.input}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errId('email') : undefined}
          />
        </Field>

        <Field id={id('tel')} label="電話番号" error={errors.tel} errorId={errId('tel')}>
          <input
            id={id('tel')}
            className={styles.input}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.tel}
            onChange={(e) => set('tel', e.target.value)}
            aria-invalid={Boolean(errors.tel)}
            aria-describedby={errors.tel ? errId('tel') : undefined}
          />
        </Field>

        <fieldset
          className={styles.fieldset}
          aria-required="true"
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? errId('category') : undefined}
        >
          <legend className={styles.label}>
            お問い合わせ種別 <span className={styles.required}>必須</span>
          </legend>
          <div className={styles.radios}>
            {categories.map((c, i) => (
              <label key={c.value} className={styles.radio}>
                <input
                  id={i === 0 ? id('category') : undefined}
                  type="radio"
                  name={`${uid}-category`}
                  value={c.value}
                  checked={values.category === c.value}
                  onChange={() => set('category', c.value)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
          {errors.category && (
            <p id={errId('category')} className={styles.error}>
              {errors.category}
            </p>
          )}
        </fieldset>

        <Field id={id('message')} label="お問い合わせ内容" required error={errors.message} errorId={errId('message')}>
          <textarea
            id={id('message')}
            className={`${styles.input} ${styles.textarea}`}
            rows={7}
            maxLength={2000}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errId('message') : undefined}
          />
        </Field>

        <div className={styles.agreeWrap}>
          <label className={styles.checkbox}>
            <input
              id={id('agree')}
              type="checkbox"
              checked={values.agree}
              onChange={(e) => set('agree', e.target.checked)}
              aria-required="true"
              aria-invalid={Boolean(errors.agree)}
              aria-describedby={errors.agree ? errId('agree') : undefined}
            />
            <span>
              <Link to="/privacy">プライバシーポリシー</Link>に同意する{' '}
              <span className={styles.required}>必須</span>
            </span>
          </label>
          {errors.agree && (
            <p id={errId('agree')} className={styles.error}>
              {errors.agree}
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? '送信中…' : '送信する'}
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
};

function Field({ id, label, required, error, errorId, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>必須</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
