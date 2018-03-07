from django.utils.translation import ugettext_lazy as _
from jet.dashboard import modules
from jet.dashboard.dashboard import Dashboard, AppIndexDashboard


class CustomIndexDashboard(Dashboard):
    columns = 2
    available_children = None
    children = None

    def init_with_context(self, context):

        self.children.append(modules.AppList(
            _('Administration'),
            models=('auth.*',),
            column=0,
            order=0,
            deletable=False,
            draggable=False
        ))

        self.children.append(modules.AppList(
            _('Aplicações'),
            exclude=('auth.*',),
            column=0,
            order=0,
            deletable=False,
            draggable=False
        ))

        self.children.append(modules.RecentActions(
            _('Ações recentes'),
            10,
            deletable=False,
            draggable=False,
            collapsible=False,
            column=1,
            order=0,

        ))




