#-*- coding: UTF8 -*-
import pkg_resources
import requests

from urlparse import urlparse

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment

class VideoQuizBlock(XBlock):
    """
    An XBlock providing oEmbed capabilities for video
    """

    src = String(help="URL of the video page at the provider", default=None, scope=Scope.content)

    '''
    Util functions
    '''
    def load_resource(self, resource_path):
        """
        Gets the content of a resource
        """
        resource_content = pkg_resources.resource_string(__name__, resource_path)
        #return unicode(resource_content)
        return resource_content.decode("UTF8")


    def student_view(self, context):
        """
        Create a fragment used to display the XBlock to a student.
        `context` is a dictionary used to configure the display (unused).

        Returns a `Fragment` object specifying the HTML, CSS, and JavaScript
        to display.
        """
        # Load the HTML fragment from within the package and fill in the template
        html_str = pkg_resources.resource_string(__name__, "static/html/videoquiz.html")
        frag = Fragment(unicode(html_str).format(self=self, src=self.src))
        frag.add_javascript(self.load_resource("static/js/videoquiz.js"))
        frag.add_css(self.load_resource("static/css/style.css"))
        frag.initialize_js('coucou')

        return frag

    def studio_view(self, context):
        """
        Editing view in Studio
        """
        html_str = pkg_resources.resource_string(__name__, "static/html/videoquiz_edit.html")
        frag = Fragment(unicode(html_str).format(self=self, src=self.src))
        frag.add_javascript(self.load_resource("static/js/videoquiz_edit.js"))

        frag.initialize_js('VideoQuizEditBlock')

        return frag

    @XBlock.json_handler
    def studio_submit(self, submissions, suffix=''):
        log.info(u'Received submissions: {}'.format(submissions))

        self.api_key = submissions['api_key']

        if submissions.get('href', self.href) != self.href: # URL changed
            self.href = submissions['href']

            # Update the video details
            self.set_api_params_from_href()

        return {
            'result': 'success',
        }

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("Interactive video",
            """
            <vertical_demo>
                <videoquiz src="http://eliiie.com/gt/TSGELCT3T114-V006400_100.mp4" />
            </vertical_demo>
            """)
        ]
