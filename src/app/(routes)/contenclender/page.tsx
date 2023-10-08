'use client';
import React, { Fragment, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, DateLocalizer } from 'react-big-calendar';
import DemoLink from '@/components/democontent/DemoLink';
import events from '@/components/democontent/ResourceEvent'

require('globalize/lib/cultures/globalize.culture.en-GB')
require('globalize/lib/cultures/globalize.culture.es')
require('globalize/lib/cultures/globalize.culture.fr')
require('globalize/lib/cultures/globalize.culture.ar-AE')

const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
const lang = {
  en: null,
  'en-GB': null,
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'El Diario',

    showMore: (total) => `+${total} más`,
  },
  fr: {
    week: 'La semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Antérieur',
    next: 'Prochain',
    today: `Aujourd'hui`,
    agenda: 'Ordre du jour',

    showMore: (total) => `+${total} plus`,
  },
  'ar-AE': {
    week: 'أسبوع',
    work_week: 'أسبوع العمل',
    day: 'يوم',
    month: 'شهر',
    previous: 'سابق',
    next: 'التالي',
    today: 'اليوم',
    agenda: 'جدول أعمال',

    showMore: (total) => `+${total} إضافي`,
  },
}



function ContenClender({localizer}) {

    const [culture, setCulture] = useState('en-GB')
    const [rightToLeft, setRightToLeft] = useState(false)

    const cultureOnClick = useCallback(
        ({ target: { value } }) => {
          // really better to useReducer for simultaneously setting multiple state values
          setCulture(value)
          setRightToLeft(value === 'ar-AE')
        },
        [setCulture]
      )
    
      const { defaultDate, messages } = useMemo(
        () => ({
          defaultDate: new Date(2023, 3, 1),
          messages: lang[culture],
        }),
        [culture]
      )
    
  
    return (
        <div>
            <Calendar
                culture={culture}
                defaultDate={defaultDate}
                events={events}
                localizer={localizer}
                messages={messages}
                rtl={rightToLeft}
            />
        </div>
    )
}
ContenClender.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
  }
export default ContenClender;